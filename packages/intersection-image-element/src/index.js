import css from './index.css';

export default class IntersectionImageElement extends HTMLElement {
	constructor () {
		super();

		this.attachShadow({ mode: 'open' });

		this.placeholderImage = this.shadowRoot.appendChild(document.createElement('img'));
		this.intersectionImage = document.createElement('img');

		this.shadowRoot.appendChild(document.createElement('style')).append(css);

		const onComplete = event => {
			if (this.intersectionImage.naturalWidth) {
				this.shadowRoot.removeChild(this.placeholderImage);
				this.shadowRoot.appendChild(this.intersectionImage);
			}

			IntersectionImageElement.intersectionObserver.unobserve(this);

			this.dispatchEvent(new event.constructor(event.type, event));
		};

		this.intersectionImage.addEventListener('load', onComplete);

		this.intersectionImage.addEventListener('error', onComplete);
	}

	connectedCallback () {
		IntersectionImageElement.intersectionObserver.observe(this);
	}

	attributeChangedCallback (name, oldValue, newValue) {
		if (name === 'src' && this.complete) {
			this.shadowRoot.removeChild(this.intersectionImage);
			this.shadowRoot.appendChild(this.placeholderImage);

			IntersectionImageElement.intersectionObserver.observe(this);
		} else if (name === 'width' || name === 'height') {
			if (name === 'width') {
				this.placeholderImage.width = this.intersectionImage.width = newValue;
			} else {
				this.placeholderImage.height = this.intersectionImage.height = newValue;
			}

			this.placeholderImage.src = `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="${this.width}" height="${this.height}"%3E%3C/svg%3E`;
		}
	}

	get complete () {
		return Boolean(this.intersectionImage.src) && this.intersectionImage.complete;
	}

	get height () {
		return this.complete ? this.intersectionImage.height : this.placeholderImage.height;
	}

	set height (newValue) {
		if (newValue === null) {
			this.removeAttribute('height');
		} else {
			this.setAttribute('height', newValue);
		}
	}

	get src () {
		return this.getAttribute('src');
	}

	set src (newValue) {
		const value = newValue === null ? null : String(newValue);

		if (value === null) {
			this.removeAttribute('src');
		} else if (value !== this.src) {
			this.setAttribute('src', value);
		}
	}

	get width () {
		return this.complete ? this.intersectionImage.width : this.placeholderImage.width;
	}

	set width (newValue) {
		if (newValue === null) {
			this.removeAttribute('width');
		} else {
			this.setAttribute('width', newValue);
		}
	}

	static intersectionObserverCallback (entries) {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				entry.target.intersectionImage.src = entry.target.getAttribute('src');
			}
		}
	}

	static get observedAttributes () {
		return ['src', 'width', 'height'];
	}

	static intersectionObserverInit = {};

	static intersectionObserver = new IntersectionObserver(IntersectionImageElement.intersectionObserverCallback, IntersectionImageElement.intersectionObserverInit);
}
