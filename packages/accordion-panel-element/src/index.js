import $ from '@t7/domset';
import css from './index.css';

/**
* @name AccordionPanelElement
* @class
* @extends HTMLElement
* @classdesc Return a new Accordion Element.
* @returns {AccordionPanelElement~Instance}
*/
/**
* @typedef AccordionPanelElement~Instance
* @property {Boolean} open - Indicates whether the {@link AccordionPanelElement} is open.
* @property {Number} lastOpened - Indicates when the {@link AccordionPanelElement} was last opened by the number of milliseconds elapsed since January 1, 1970 00:00:00 UTC.
* @property {Function} showAccordion - Opens the {@link AccordionPanelElement}.
* @property {Function} close - Closes the {@link AccordionPanelElement}.
* @property {Function} label - Determines the label used to toggle whether the {@link AccordionPanelElement} is open.
*/

export default class AccordionPanelElement extends HTMLElement {
	constructor () {
		super();

		const _ = mapForAccordionPanelElement.set(this, {}).get(this);

		$(this.attachShadow({ mode: 'open' }), null,
			$('style', null, css)
		);

		_.controlElement = this.shadowRoot.appendChild($('h3', { class: 'heading' })).appendChild($('button', { class: 'control' }, ''));
		_.controlText = _.controlElement.lastChild;
		_.regionElement = this.shadowRoot.appendChild($('div', { class: 'region region--hidden', role: 'region', 'aria-hidden': true }, $('slot')));

		this.lastOpened = null;

		_.controlElement.addEventListener('click', () => {
			this.open = !this.open;
		});
	}

	attributeChangedCallback (name, oldValue, newValue) {
		const _ = mapForAccordionPanelElement.get(this);

		if (name === 'label' && oldValue !== newValue) {
			_.controlText.data = newValue;
		} else if (name === 'open') {
			const normalizedOldValue = oldValue === null ? null : '';
			const normalizedNewValue = newValue === null ? null : '';

			if (normalizedOldValue !== normalizedNewValue) {
				if (normalizedNewValue === null) {
					close.call(this);
				} else {
					open.call(this);
				}
			}
		}

		function close () {
			const _ = mapForAccordionPanelElement.get(this);

			const openElements = Object(Object(this.parentNode).panels).length ? this.parentNode.panels.filter(element => element.open) : [];
			const min = typeof Object(this.parentNode).min === 'number' ? this.parentNode.min : 0;

			if (openElements) {
				if (min > openElements.length) {
					return $(this, { open: true });
				}
			}

			this.lastOpened = null;

			$(_.controlElement, { 'aria-disabled': false });
			$(_.regionElement, { class: 'region region--hidden', 'aria-hidden': true });

			this.dispatchEvent(new CustomEvent('close', { bubbles: true }));
		}

		function open () {
			const _ = mapForAccordionPanelElement.get(this);

			this.lastOpened = Date.now();

			$(_.controlElement, { 'aria-disabled': true });
			$(_.regionElement, { class: 'region', 'aria-hidden': false });

			this.dispatchEvent(new CustomEvent('open', { bubbles: true }));

			const openElements = Object(Object(this.parentNode).panels).length ? this.parentNode.panels.filter(element => element.open) : [];
			const max = typeof Object(this.parentNode).max === 'number' ? this.parentNode.max : Infinity;

			if (openElements) {
				if (max < openElements.length) {
					const closeElement = openElements.shift();

					$(closeElement, { open: false });
				}
			}
		}
	}

	showAccordion () {
		this.open = true;
	}

	close () {
		this.open = false;
	}

	get label () {
		return this.getAttribute('label');
	}

	set label (newValue) {
		if (newValue) {
			this.setAttribute('label', newValue);
		} else {
			this.removeAttribute('label');
		}
	}

	get open () {
		return this.hasAttribute('open');
	}

	set open (newValue) {
		if (newValue) {
			this.setAttribute('open', '');
		} else {
			this.removeAttribute('open');
		}
	}

	static get observedAttributes () {
		return ['label', 'open'];
	}
}

const mapForAccordionPanelElement = new WeakMap();
