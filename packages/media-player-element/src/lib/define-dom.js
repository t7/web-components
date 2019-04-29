import $ from '@t7/domset';
import $svg from './define-svg.js';
import css from '../index.css';

export default function (_) {
	// style
	_.styleElement = $('style', null, css);

	// media
	_.videoElement = $('video', { class: 'media-media audio' });

	// play/pause toggle
	_.playSymbol = $svg('play');
	_.pauseSymbol = $svg('pause');
	_.playButton = $('button', { class: 'media-control media-play' }, _.playSymbol, _.pauseSymbol);

	// time slider
	_.timeMeter = $('span', { class: 'media-meter media-time-meter' });
	_.timeRange = $('span', { class: 'media-range media-time-range' }, _.timeMeter);
	_.timeButton = $('button', { class: 'media-slider media-time', role: 'slider', 'aria-label': _.super.lang.currentTime, 'data-dir': _.timeDir }, _.timeRange);

	// current time text
	_.currentTimeSpan = $('span', { class: 'media-text media-current-time', role: 'timer', 'aria-label': _.super.lang.currentTime }, '');
	_.currentTimeText = _.currentTimeSpan.lastChild;

	// remaining time text
	_.remainingTimeSpan = $('span', { class: 'media-text media-remaining-time', role: 'timer', 'aria-label': _.super.lang.remainingTime }, '');
	_.remainingTimeText = _.remainingTimeSpan.lastChild;

	// mute/unmute toggle
	_.muteSymbol = $svg('mute');
	_.unmuteSymbol = $svg('unmute');
	_.muteButton = $('button', { class: 'media-control media-mute' }, _.muteSymbol, _.unmuteSymbol);

	// volume slider
	_.volumeMeter = $('span', { class: 'media-meter media-volume-meter' });
	_.volumeRange = $('span', { class: 'media-range media-volume-range' }, _.volumeMeter);
	_.volumeButton = $('button', { class: 'media-slider media-volume', role: 'slider', 'aria-label': _.super.lang.volume, 'data-dir': _.volumeDir }, _.volumeRange);

	// download button
	_.downloadSymbol = $svg('download');
	_.downloadButton = $('button', { class: 'media-control media-download', 'aria-label': _.super.lang.download }, _.downloadSymbol);

	// fullscreen button
	_.enterFullscreenSymbol = $svg('enterFullscreen');
	_.leaveFullscreenSymbol = $svg('leaveFullscreen');
	_.fullscreenButton = $('button', { class: 'media-control media-fullscreen' }, _.enterFullscreenSymbol, _.leaveFullscreenSymbol);

	// player toolbar
	_.toolbarElement = $('div',
		{ class: 'media-toolbar', role: 'toolbar', 'aria-label': _.super.lang.player },
		_.playButton, _.muteButton, _.volumeButton, _.currentTimeSpan, _.timeButton, _.remainingTimeSpan, _.downloadButton, _.fullscreenButton
	);

	// player
	_.playerElement = $('div', { class: 'media-player', role: 'region', 'aria-label': _.super.lang.player }, _.styleElement, _.videoElement, _.toolbarElement);

	_.root.append(_.playerElement);
}
