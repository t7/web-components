# Accordion Panel Element [<img src="https://t7.github.io/web-components/web_components-logo.svg" alt="" width="110" height="90" align="right">][Accordion Panel Element]

[![Build Status][cli-img]][cli-url]
[![Issue Tracker][git-img]][git-url]
[![Pull Requests][gpr-img]][gpr-url]

[Accordion Panel Element] is a [Web Component] for containing a collapsible
panel with a label to toggle its visibility. It will add up to 1.04kB to your
project.

**[Try it now](https://t7.github.io/web-components/accordion-panel-element/)**

## Usage

Add the Accordion Panel Element to your page.

```html
<script src="https://unpkg.com/@t7/accordion-panel-element"></script>
```

Alternatively, add the Accordion Panel Element to your project:

```sh
npm install @t7/accordion-panel-element
```

```js
import AccordionPanelElement from '@t7/accordion-panel-element';

customElements.define('accordion-panel', AccordionPanelElement);
```

```html
<accordion-panel label="Accordion Panel 1" open>
  <p>Content for the first accordion panel.</p>
</accordion-panel>
<accordion-panel label="Accordion Panel 2">
  <p>Content for the second accordion panel.</p>
</accordion-panel>
<accordion-panel label="Accordion Panel 3">
  <p>Content for the third accordion panel.</p>
</accordion-panel>
```

## Attributes

### label

  The `label` attribute determines the label used to toggle whether the
  Accordion Panel is open.

```html
<!-- label the panel "Billing Address" -->
<accordion-panel label="Billing Address"></accordion-panel>
```

### open

The `opens` attribute determines whether the Accordion Panel content is
collapsed or visible.

```html
<!-- the panel is open -->
<accordion-panel open></accordion-panel>
```

```html
<!-- the panel is closed -->
<accordion-panel></accordion-panel>
```

[Accordion Panel Element]: https://github.com/t7/web-components/tree/master/packages/accordion-panel-element
[Web Component]: https://github.com/t7/web-components

[cli-img]: https://img.shields.io/travis/t7/web-components/master.svg
[cli-url]: https://travis-ci.org/t7/web-components
[git-img]: https://img.shields.io/github/issues-raw/t7/web-components.svg
[git-url]: https://github.com/t7/web-components/issues
[gpr-img]: https://img.shields.io/github/issues-pr-raw/t7/web-components.svg
[gpr-url]: https://github.com/t7/web-components/pulls
