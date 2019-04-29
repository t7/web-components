import $ from '@t7/domset';
import uid from '@t7/uid';

export default function (_) {
	_.onYoutube = id => {
		_.youtubeID = uid(21);

		_.youtubePoster = $('img', { class: 'media-media video', src: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`, onload: _.youtubeOnPosterLoad });

		_.youtubeIframe = $('iframe', {
			frameBorder: 0,
			allowfullscreen: 1,
			allow: 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture',
			src: `https://www.youtube.com/embed/${id}?controls=0&disablekb=1&enablejsapi=1&iv_load_policy=3&modestbranding=1&playsinline=1&rel=0&showinfo=0&version=3`
		});

		_.youtubeContainer = $('div', { class: 'media-frame' }, _.youtubePoster, _.youtubeIframe);

		_.youtubeAPI = json => {
			const message = JSON.stringify(Object.assign({ id: _.youtubeID }, json));

			if (_.youtubeWindow) {
				_.youtubeWindow.postMessage(message, '*');
			} else {
				setTimeout(() => {
					_.youtubeAPI(json);
				}, 200);
			}
		};

		_.youtubeAPICommand = (func, args) => _.youtubeAPI({
			event: 'command',
			func,
			args: args || []
		});

		_.youtubeAPIState = {};

		_.youtubeListener = () => {
			_.onDownloadClick = () => {
				window.location = `https://www.youtube.com/watch?v=${id}`;
			};

			$(_.downloadButton, { onclick: _.onDownloadClick });

			window.addEventListener('message', event => {
				if (event.origin === 'https://www.youtube.com') {
					const data = JSON.parse(event.data);

					if (data.info && data.id === _.youtubeID) {
						Object.assign(_.youtubeAPIState, data.info);

						if (data.info.duration) {
							_.onTimeChange();
						}

						if (data.info.muted || data.info.volume) {
							_.onVolumeChange();
						}

						if (data.info.playerState) {
							_.onPlayChange();
						}
					}
				}
			});

			_.youtubeWindow = _.youtubeIframe.contentWindow;

			_.youtubeAPI({
				event: 'listening'
			});
		};

		_.youtubeIframe.addEventListener('load', _.youtubeListener);

		Object.defineProperties(_.videoElement, {
			audio: {
				get () {
					return _.youtubePoster.classList.contains('audio');
				},
				set (newValue) {
					_.youtubePoster.classList.toggle('audio', !newValue);
					_.youtubePoster.classList.toggle('video', newValue);
				}
			},
			currentTime: {
				get () {
					return _.youtubeAPIState.currentTime;
				},
				set (newValue) {
					_.youtubeAPICommand('seekTo', [Number(newValue) || 0]);
				}
			},
			duration: {
				get () {
					return _.youtubeAPIState.duration;
				}
			},
			muted: {
				get () {
					return _.youtubeAPIState.muted;
				},
				set (newValue) {
					_.youtubeAPICommand(newValue ? 'mute' : 'unMute');
				}
			},
			paused: {
				get () {
					return _.youtubeAPIState.playerState !== 1;
				},
				set (newValue) {
					_.youtubeAPICommand(newValue ? 'pauseVideo' : 'playVideo');
				}
			},
			pause: {
				value () {
					this.paused = true;
				}
			},
			poster: {
				get () {
					return _.youtubePoster.src;
				},
				set (newValue) {
					_.youtubePoster.src = String(newValue);
				}
			},
			play: {
				value () {
					this.paused = false;
				}
			},
			volume: {
				get () {
					return _.youtubeAPIState.volume / 100;
				},
				set (newValue) {
					_.youtubeAPICommand('setVolume', [Number(newValue * 100) || 0]);
				}
			},
			setAttribute: {
				value (name, value) {
					_.videoElement[name] = value;
				}
			}
		})

		_.videoElement.replaceWith(_.youtubeContainer);
	}
}
