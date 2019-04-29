import observedAttributes from './lib/observed-attributes.js';
import observedProperties from './lib/observed-properties.js';
import defineDOM from './lib/define-dom.js';
import defineEvents from './lib/define-events.js';

export default class MediaPlayer extends HTMLElement {
	constructor () {
		super();

		const _ = this.__INTERNALS = {
			root: this.attachShadow({ mode: 'closed' }),
			self: this,
			super: MediaPlayer,
			mediaType: 'audio',
			timeDir: 'ltr',
			volumeDir: 'ltr'
		};

		defineDOM(_);
		defineEvents(_);
	}

	attributeChangedCallback (name, oldValue, newValue) {
		if (oldValue !== newValue) {
			if (name === 'volume') {
				this.__INTERNALS.videoElement.volume = Number(newValue);
			} else if (observedAttributes.includes(name)) {
				this.__INTERNALS.videoElement.setAttribute(name, newValue);
			}
		}
	}

	static get observedAttributes () {
		return observedAttributes;
	}

	static lang = {
		currentTime: 'current time',
		download: 'download',
		enterFullscreen: 'enter full screen',
		leaveFullscreen: 'leave full screen',
		minutes: 'minutes',
		mute: 'mute',
		play: 'play',
		player: 'media player',
		pause: 'pause',
		remainingTime: 'remaining time',
		seconds: 'seconds',
		unmute: 'unmute',
		volume: 'volume'
	};
}

observedProperties.forEach(name => {
	Object.defineProperty(MediaPlayer.prototype, name, {
		get () {
			return typeof this.__INTERNALS.videoElement[name] === 'function' ? this.__INTERNALS.videoElement[name].bind(this.__INTERNALS.videoElement) : this.__INTERNALS.videoElement[name];
		},
		set (newValue) {
			this.__INTERNALS.videoElement[name] = newValue;
		}
	})
});
