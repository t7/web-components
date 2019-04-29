import $ from '@t7/domset';

export default function (type) {
	const svgElement = $(document.createElementNS(svgns, 'svg'), { class: `media-symbol media-${type}-symbol`, role: 'presentation' },
		$(document.createElementNS(svgns, 'path'), { d: paths[type] })
	);

	svgElement.setAttribute('viewBox', '0 0 32 32');

	return svgElement;
}

const svgns = 'http://www.w3.org/2000/svg';
const paths = {
	download: 'M20 2v12h4l-8 10-8-10h4V2M0 21h5v6h22v-6h5v11H0',
	enterFullscreen: 'M0 0h12L8 4l6 6-4 4-6-6-4 4M32 0H20l4 4-6 6 4 4 6-6 4 4M0 32V20l4 4 6-6 4 4-6 6 4 4m20 0V20l-4 4-6-6-4 4 6 6-4 4',
	leaveFullscreen: 'M0 4l4-4 6 6 4-4v12H2l4-4m26-6l-4-4-6 6-4-4v12h12l-4-4M0 28l4 4 6-6 4 4V18H2l4 4m26 6l-4 4-6-6-4 4V18h12l-4 4',
	mute: 'M0 11h6l10-8.5v27L6 21H0M22 6l10 10-10 10',
	pause: 'M4 0h9v32H4M28 0h-9v32h9',
	play: 'M4 0l24 16L4 32',
	unmute: 'M0 11h6l10-8.5v27L6 21H0'
};
