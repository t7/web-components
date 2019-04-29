import $ from '@t7/domset';

export default function (_) {
	// fullscreen api
	const fullscreenchange = 'onfullscreenchange' in _.self ? 'fullscreenchange' : 'onwebkitfullscreenchange' in _.self ? 'webkitfullscreenchange' : 'onMSFullscreenChange' in _.self ? 'MSFullscreenChange' : 'fullscreenchange';
	const requestFullscreen = _.self.requestFullscreen || _.self.webkitRequestFullscreen || _.self.msRequestFullscreen;
	const fullscreenElement = () => _.self.ownerDocument.fullscreenElement || _.self.ownerDocument.webkitFullscreenElement || _.self.ownerDocument.msFullscreenElement;
	const exitFullscreen = () => (_.self.ownerDocument.exitFullscreen || _.self.ownerDocument.webkitCancelFullScreen || _.self.ownerDocument.msExitFullscreen).call(_.self.ownerDocument);

	// when the play control is clicked
	_.onPlayClick = () => {
		_.videoElement[_.videoElement.paused ? 'play' : 'pause']();
	};

	// when the time control
	_.onTimeClick = event => {
		// handle click if clicked without pointer
		if (!event.pointerType && !event.detail) {
			_.onPlayClick(event);
		}
	}

	// click from mute control
	_.onMuteClick = () => {
		_.videoElement.muted = !_.videoElement.muted;
	};

	// click from volume control
	_.onVolumeClick = event => {
		// handle click if clicked without pointer
		if (!event.pointerType && !event.detail) {
			_.onMuteClick(event);
		}
	};

	// click from download control
	_.onDownloadClick = () => {
		const a = _.root.appendChild($('a', { download: '', href: _.videoElement.src }));

		a.click();

		_.root.removeChild(a);
	};

	// click from fullscreen control
	_.onFullscreenClick = () => {
		if (requestFullscreen) {
			if (_.self === fullscreenElement()) {
				// exit fullscreen
				exitFullscreen();
			} else {
				// enter fullscreen
				requestFullscreen.call(_.self);
			}
		} else if (_.videoElement.webkitSupportsFullscreen) {
			// iOS allows fullscreen of the video itself
			if (_.videoElement.webkitDisplayingFullscreen) {
				// exit ios fullscreen
				_.videoElement.webkitExitFullscreen();
			} else {
				// enter ios fullscreen
				_.videoElement.webkitEnterFullscreen();
			}

			_.onFullscreenChange();
		}
	};

	// keydown from play control or current time control
	_.onTimeKeydown = event => {
		const { keyCode, shiftKey } = event;

		// 37: LEFT, 38: UP, 39: RIGHT, 40: DOWN
		if (37 <= keyCode && 40 >= keyCode) {
			event.preventDefault();

			const isLTR = /^(btt|ltr)$/.test(_.timeDir);
			const offset = 37 === keyCode || 39 === keyCode ? keyCode - 38 : keyCode - 39;

			_.videoElement.currentTime = Math.max(0, Math.min(_.duration, _.currentTime + offset * (isLTR ? 1 : -1) * (shiftKey ? 10 : 1)));

			_.onTimeChange();
		}
	};

	// keydown from mute control or volume control
	_.onVolumeKeydown = event => {
		const { keyCode, shiftKey } = event;

		// 37: LEFT, 38: UP, 39: RIGHT, 40: DOWN
		if (37 <= keyCode && 40 >= keyCode) {
			event.preventDefault();

			const isLTR = /^(btt|ltr)$/.test(_.volumeDir);
			const offset = 37 === keyCode || 39 === keyCode ? keyCode - 38 : isLTR ? 39 - keyCode : keyCode - 39;

			_.videoElement.volume = Math.max(0, Math.min(1, _.videoElement.volume + offset * (isLTR ? 0.1 : -0.1) * (shiftKey ? 1 : 0.2)));
		}
	};

	// when the play state changes
	_.onPlayChange = event => {
		if (_.paused !== _.videoElement.paused) {
			_.paused = _.videoElement.paused;

			$(_.playButton, { 'aria-label': _.paused ? _.super.lang.play : _.super.lang.pause });
			$(_.playSymbol, { hidden: !_.paused });
			$(_.pauseSymbol, { hidden: _.paused });

			clearInterval(_.interval);

			if (!_.paused) {
				// listen for time changes every 30th of a second
				_.interval = setInterval(_.onTimeChange, 34);
			}

			// dispatch new "playchange" event
			_.self.dispatchEvent(new CustomEvent('playchange'));

			if (event) {
				_.self.dispatchEvent(cloneEvent(event));
			}
		}
	};

	// when the time changes
	_.onTimeChange = event => {
		if (_.currentTime !== _.videoElement.currentTime || _.duration !== _.videoElement.duration) {
			_.currentTime = _.videoElement.currentTime;
			_.duration = _.videoElement.duration || 0;

			const currentTimePercentage = _.currentTime / _.duration;
			const currentTimeCode = timeToTimecode(_.currentTime);
			const remainingTimeCode = timeToTimecode(_.duration - Math.floor(_.currentTime));

			if (currentTimeCode !== _.currentTimeText.nodeValue) {
				_.currentTimeText.nodeValue = currentTimeCode;

				$(_.currentTimeSpan, { title: `${timeToAural(_.currentTime, _.super.lang.minutes, _.super.lang.seconds)}` });
			}

			if (remainingTimeCode !== _.remainingTimeText.nodeValue) {
				_.remainingTimeText.nodeValue = remainingTimeCode;

				$(_.remainingTimeSpan, { title: `${timeToAural(_.duration - _.currentTime, _.super.lang.minutes, _.super.lang.seconds)}` });
			}

			$(_.timeButton, { 'aria-valuenow': _.currentTime, 'aria-valuemin': 0, 'aria-valuemax': _.duration });

			const dirIsInline = /^(ltr|rtl)$/i.test(_.timeDir);
			const axisProp = dirIsInline ? 'width' : 'height';

			_.timeMeter.style[axisProp] = `${currentTimePercentage * 100}%`;

			const mediaType = _.videoElement.poster || _.videoElement.videoWidth ? 'video' : 'audio';

			if (_.mediaType !== mediaType) {
				if (_.mediaType) {
					_.videoElement.classList.remove(_.mediaType);
				}

				_.mediaType = mediaType;

				_.videoElement.classList.add(mediaType);
			}

			if (event) {
				_.self.dispatchEvent(cloneEvent(event));
			}

			// dispatch new "timechange" event
			_.self.dispatchEvent(new CustomEvent('timechange'));
		}
	};

	// when media loads for the first time
	_.onLoadStart = event => {
		$(_.videoElement, { oncanplaythrough: _.onCanPlayStart });

		_.onPlayChange();
		_.onVolumeChange();
		_.onFullscreenChange();
		_.onTimeChange();

		if (event) {
			_.self.dispatchEvent(cloneEvent(event));
		}
	};

	// when the media can play
	_.onCanPlayStart = event => {
		$(_.videoElement, { oncanplaythrough: _.onCanPlayStart });

		// dispatch new "canplaystart" event
		_.self.dispatchEvent(new CustomEvent('canplaystart'));

		if (!_.videoElement.paused || _.videoElement.autoplay) {
			_.videoElement.play();
		}

		if (event) {
			_.self.dispatchEvent(cloneEvent(event));
		}
	};

	// when the volume changes
	_.onVolumeChange = event => {
		const volumePercentage = _.videoElement.muted ? 0 : _.videoElement.volume;
		const isMuted = !volumePercentage;

		$(_.volumeButton, { 'aria-valuenow': volumePercentage, 'aria-valuemin': 0, 'aria-valuemax': 1 });

		const dirIsInline = /^(ltr|rtl)$/i.test(_.volumeDir);
		const axisProp = dirIsInline ? 'width' : 'height';

		_.volumeMeter.style[axisProp] = `${volumePercentage * 100}%`;

		$(_.muteButton, { 'aria-label': isMuted ? _.super.lang.unmute : _.super.lang.mute });
		$(_.muteSymbol, { hidden: isMuted });
		$(_.unmuteSymbol, { hidden: !isMuted });

		if (event) {
			_.self.dispatchEvent(cloneEvent(event));
		}
	};

	// when the fullscreen state changes
	_.onFullscreenChange = () => {
		const isFullscreen = _.self === fullscreenElement();

		$(_.fullscreenButton, { 'aria-label': isFullscreen ? _.super.lang.leaveFullscreen : _.super.lang.enterFullscreen });
		$(_.enterFullscreenSymbol, { hidden: isFullscreen });
		$(_.leaveFullscreenSymbol, { hidden: !isFullscreen });
	};

	$(_.videoElement, {
		oncanplaythrough: _.onCanPlayStart,
		onloadedmetadata: _.onTimeChange,
		onloadstart: _.onLoadStart,
		onpause: _.onPlayChange,
		onplay: _.onPlayChange,
		ontimeupdate: _.onTimeChange,
		onvolumechange: _.onVolumeChange
	});

	$(_.playButton, {
		onclick: _.onPlayClick,
		onkeydown: _.onTimeKeydown
	});

	$(_.timeButton, {
		onclick: _.onTimeClick,
		onkeydown: _.onTimeKeydown
	});

	$(_.muteButton, {
		onclick: _.onMuteClick,
		onkeydown: _.onVolumeKeydown
	});

	$(_.volumeButton, {
		onclick: _.onVolumeClick,
		onkeydown: _.onVolumeKeydown
	});

	$(_.downloadButton, {
		onclick: _.onDownloadClick
	})

	$(_.fullscreenButton, {
		onclick: _.onFullscreenClick
	});

	// pointer events from time control
	onDrag(_.timeButton, _.timeRange, _.timeDir, percentage => {
		_.videoElement.currentTime = _.duration * Math.max(0, Math.min(1, percentage));

		_.onTimeChange();
	});

	// pointer events from volume control
	onDrag(_.volumeButton, _.volumeRange, _.volumeDir, percentage => {
		_.videoElement.volume = Math.max(0, Math.min(1, percentage));
	});

	_.self.ownerDocument.addEventListener(fullscreenchange, _.onFullscreenChange);

	_.onLoadStart();
}

/* Handle Drag Ranges
/* ========================================================================== */

function onDrag(target, innerTarget, dir, listener) { // eslint-disable-line max-params
	const hasPointerEvent = undefined !== target.onpointerup;
	const hasTouchEvent   = undefined !== target.ontouchstart;
	const pointerDown = hasPointerEvent ? 'pointerdown' : hasTouchEvent ? 'touchstart' : 'mousedown';
	const pointerMove = hasPointerEvent ? 'pointermove' : hasTouchEvent ? 'touchmove' : 'mousemove';
	const pointerUp   = hasPointerEvent ? 'pointerup'   : hasTouchEvent ? 'touchend' : 'mouseup';

	// ...
	const dirIsInline = /^(ltr|rtl)$/i.test(dir);
	const dirIsStart  = /^(ltr|ttb)$/i.test(dir);

	// ...
	const axisProp = dirIsInline ? 'clientX' : 'clientY';

	let window, start, end;

	// on pointer down
	target.addEventListener(pointerDown, onpointerdown);

	function onpointerdown(event) {
		// window
		window = target.ownerDocument.defaultView;

		// client boundaries
		const rect = innerTarget.getBoundingClientRect();

		// the container start and end coordinates
		start = dirIsInline ? rect.left : rect.top;
		end   = dirIsInline ? rect.right : rect.bottom;

		onpointermove(event);

		window.addEventListener(pointerMove, onpointermove);
		window.addEventListener(pointerUp, onpointerup);
	}

	function onpointermove(event) {
		// prevent browser actions on this event
		event.preventDefault();

		// the pointer coordinate
		const position = axisProp in event ? event[axisProp] : event.touches && event.touches[0] && event.touches[0][axisProp] || 0;

		// the percentage of the pointer along the container
		const percentage = (dirIsStart ? position - start : end - position) / (end - start);

		// call the listener with percentage
		listener(percentage);
	}

	function onpointerup() {
		window.removeEventListener(pointerMove, onpointermove);
		window.removeEventListener(pointerUp, onpointerup);
	}
}

/* Time To Timecode
/* ====================================================================== */

function timeToTimecode(time) {
	return `${`0${Math.floor(time / 60)}`.slice(-2)}:${`0${Math.floor(time % 60)}`.slice(-2)}`;
}

/* Time To Aural
/* ====================================================================== */

function timeToAural(time, langMinutes, langSeconds) {
	return `${Math.floor(time / 60)} ${langMinutes}, ${Math.floor(time % 60)} ${langSeconds}`;
}

/* Clone Event
/* ====================================================================== */

function cloneEvent(event) {
	return Object.assign(new event.constructor(event.type, event), {
		relatedTarget: event.target
	});
}
