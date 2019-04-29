import MediaPlayer from '@t7/media-player-element';
import observedAttributes from './lib/observed-attributes.js';
import defineYoutubeEvents from './lib/define-youtube-events';

export default class SocialMediaPlayer extends MediaPlayer {
	constructor () {
		super();

		defineYoutubeEvents(this.__INTERNALS);
	}

	attributeChangedCallback (name, oldValue, newValue) {
		if (oldValue !== newValue) {
			if (name === 'src') {
				if (/^[A-Za-z0-9_-]{11}$/.test(newValue)) {
					return this.__INTERNALS.onYoutube(newValue);
				} else if (this.__INTERNALS.youtubeAPIState) {
					// this.__INTERNALS.onYoutubeDestroy(newValue);
				}

				this.__INTERNALS.videoElement.setAttribute(name, newValue);
			} else if (name === 'volume') {
				this.__INTERNALS.videoElement.volume = Number(newValue);
			} else if (observedAttributes.includes(name)) {
				this.__INTERNALS.videoElement.setAttribute(name, newValue);
			}
		}
	}

	static get observedAttributes () {
		return observedAttributes;
	}
}
