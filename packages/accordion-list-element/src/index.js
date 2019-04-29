import $ from '@t7/domset';
import css from './index.css';

export default class AccordionListElement extends HTMLElement {
	constructor () {
		super();

		$(this.attachShadow({ mode: 'open' }), null,
			$('style', null, css),
			$('slot')
		);
	}

	get min () {
		return Number(this.getAttribute('min')) || 0;
	}

	get max () {
		return this.hasAttribute('max') && !isNaN(this.getAttribute('max')) ? Number(this.getAttribute('max')) : Infinity;
	}

	get panels () {
		return Array.prototype.filter.call(this.children, child => typeof child.showAccordion === 'function').sort((a, b) => a.lastOpened - b.lastOpened);
	}
}
