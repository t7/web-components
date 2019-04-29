/**
* @name RenderContentElement
* @class
* @extends HTMLElement
* @classdesc Return a new Render Content Element.
* @returns {RenderContentElement~Instance}
*/
/**
* @typedef RenderContentElement~Instance
* @property {Boolean} when - Indicates whether the {@link RenderContentElement} is accessible.
*/

export default class RenderContentElement extends HTMLElement {
	constructor () {
		super();

		this.attachShadow({ mode: 'open' });

		this.slotElement = document.createElement('slot');
	}

	attributeChangedCallback (name, oldValue, newValue) {
		if (name === 'when') {
			const shouldBeShown = newValue !== null;

			if (shouldBeShown) {
				if (!this.slotElement.parentNode) {
					this.shadowRoot.appendChild(this.slotElement);
				}
			} else {
				if (this.slotElement.parentNode) {
					this.shadowRoot.removeChild(this.slotElement);
				}
			}
		}
	}

	get when () {
		return this.hasAttribute('when');
	}

	set when (value) {
		if (value) {
			this.setAttribute('when', '');
		} else {
			this.removeAttribute('when');
		}
	}

	static get observedAttributes () {
		return ['when'];
	}
}

