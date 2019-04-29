# Accordion List Element [<img src="https://t7.github.io/web-components/web_components-logo.svg" alt="" width="110" height="90" align="right">][Accordion List Element]

[![Build Status][cli-img]][cli-url]
[![Issue Tracker][git-img]][git-url]
[![Pull Requests][gpr-img]][gpr-url]

[Accordion List Element] is a [Web Component] for containing a series of
[Accordion Panel Elements] which can be controlled collectively. It will add up
to 446 bytes to your project.

**[Try it now](https://t7.github.io/web-components/accordion-list-element/)**

## Usage

Add the Accordion List Element to your page.

```html
<script src="https://unpkg.com/@t7/accordion-list-element"></script>

<accordion-list min="1" max="2">
  <accordion-panel label="Accordion Panel 1" open>
    <p>Content for the first accordion panel.</p>
  </accordion-panel>
  <accordion-panel label="Accordion Panel 2">
    <p>Content for the second accordion panel.</p>
  </accordion-panel>
  <accordion-panel label="Accordion Panel 3">
    <p>Content for the third accordion panel.</p>
  </accordion-panel>
</accordion-list>
```

Alternatively, add the Accordion List Element to your project:

```sh
npm install @t7/accordion-list-element @t7/accordion-panel-element
```

```js
import AccordionListElement from '@t7/accordion-list-element';
import AccordionPanelElement from '@t7/accordion-panel-element';

customElements.define('accordion-list', AccordionListElement);
customElements.define('accordion-panel', AccordionPanelElement);
```

```html
<accordion-list min="1" max="2">
  <accordion-panel label="Accordion Panel 1" open>
    <p>Content for the first accordion panel.</p>
  </accordion-panel>
  <accordion-panel label="Accordion Panel 2">
    <p>Content for the second accordion panel.</p>
  </accordion-panel>
  <accordion-panel label="Accordion Panel 3">
    <p>Content for the third accordion panel.</p>
  </accordion-panel>
</accordion-list>
```

## Attributes

### min

The `min` attribute determines the minimum number of child panels that must
always be open.

```html
<!-- at least 2 panels must always be open -->
<accordion-list min="2"></accordion-list>
```

### max

The `max` attribute determines the maximum number of child panels that may be
open at a time.

```html
<!-- only 1 child panel may be open at a time -->
<accordion-list max="2"></accordion-list>
```

[Accordion List Element]: https://github.com/t7/web-components/tree/master/packages/accordion-list-element
[Accordion Panel Elements]: https://github.com/t7/web-components/tree/master/packages/accordion-panel-element
[Web Component]: https://github.com/t7/web-components

[cli-img]: https://img.shields.io/travis/t7/web-components/master.svg
[cli-url]: https://travis-ci.org/t7/web-components
[git-img]: https://img.shields.io/github/issues-raw/t7/web-components.svg
[git-url]: https://github.com/t7/web-components/issues
[gpr-img]: https://img.shields.io/github/issues-pr-raw/t7/web-components.svg
[gpr-url]: https://github.com/t7/web-components/pulls
