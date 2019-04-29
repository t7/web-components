# Render Content Element [<img src="https://t7.github.io/web-components/web_components-logo.svg" alt="" width="110" height="90" align="right">][Render Content Element]

[![Build Status][cli-img]][cli-url]
[![Issue Tracker][git-img]][git-url]
[![Pull Requests][gpr-img]][gpr-url]

[Render Content Element] is a [Web Component] for making content accessible to
the DOM when a condition is met. It will add up to 328 bytes to your project.

**[Try it now](https://t7.github.io/web-components/render-content-element/)**

## Usage

Add the Render Content Element to your page.

```html
<script src="https://unpkg.com/@t7/render-content-element"></script>
<body>
  <render-content when>
    <p>
      This text should be accessible to the user.
    </p>
  </render-content>
  <render-content>
    <p>
      This text should not be accessible to the user.
    </p>
  </render-content>
</body>
```

Alternatively, add the Render Content Element to your project:

```sh
npm install @t7/render-content-element
```

```js
import RenderContentElement from '@t7/render-content-element';

customElements.define('render-content', RenderContentElement);
```

```html
<render-content when>
  <p>
    This text should be accessible to the user.
  </p>
</render-content>
<render-content>
  <p>
    This text should not be accessible to the user.
  </p>
</render-content>
```

## Attributes

### when

The `when` attribute determines whether or not the contents of the element are
accessible.

```html
<!-- the contents are accessible -->
<render-content when></render-content>
```

```html
<!-- the contents are not accessible -->
<render-content></render-content>
```

[Render Content Element]: https://github.com/t7/web-components/tree/master/packages/render-content-element
[Web Component]: https://github.com/t7/web-components

[cli-img]: https://img.shields.io/travis/t7/web-components/master.svg
[cli-url]: https://travis-ci.org/t7/web-components
[git-img]: https://img.shields.io/github/issues-raw/t7/web-components.svg
[git-url]: https://github.com/t7/web-components/issues
[gpr-img]: https://img.shields.io/github/issues-pr-raw/t7/web-components.svg
[gpr-url]: https://github.com/t7/web-components/pulls
