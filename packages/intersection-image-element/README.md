# Intersection Image Element [<img src="https://t7.github.io/web-components/web_components-logo.svg" alt="" width="110" height="90" align="right">][Intersection Image Element]

[![Build Status][cli-img]][cli-url]
[![Issue Tracker][git-img]][git-url]
[![Pull Requests][gpr-img]][gpr-url]

[Intersection Image Element] is a [Web Component] for loading an image source
after it is partially or fully visible to the viewport. It will add up to 780
bytes to your project.

**[Try it now](https://t7.github.io/web-components/intersection-image-element/)**

## Usage

Add the Intersection Image Element to your page.

```html
<script src="https://unpkg.com/@t7/intersection-image-element"></script>
```

Alternatively, add the Intersection Image Element to your project:

```sh
npm install @t7/intersection-image-element
```

```js
import IntersectionImageElement from '@t7/intersection-image-element';

customElements.define('intersection-image', IntersectionImageElement);
```

```html
<intersection-image src="https://sloow.me/1000/placehold.it/800x400" width="400" height="200"></intersection-image>
```

## Attributes

### src

The `src` attribute determines the image URL being loaded when the element is
visible.

```html
<!-- load https://placehold.it/800x400 when this element is visible -->
<intersection-image src="https://placehold.it/800x400"></intersection-image>
```

### width

The `width` attribute determines the intrinsic width of the image in pixels. A
placeholder image using this length will preserve the aspect ratio of the
element until the image URL is loaded.

```html
<!-- preserve a width of 400 -->
<intersection-image width="400"></intersection-image>
```

### height

The `height` attribute determines the intrinsic height of the image in pixels.

```html
<!-- preserve a height of 225 -->
<intersection-image height="225"></intersection-image>
```

[Intersection Image Element]: https://github.com/t7/web-components/tree/master/packages/intersection-image-element
[Web Component]: https://github.com/t7/web-components

[cli-img]: https://img.shields.io/travis/t7/web-components/master.svg
[cli-url]: https://travis-ci.org/t7/web-components
[git-img]: https://img.shields.io/github/issues-raw/t7/web-components.svg
[git-url]: https://github.com/t7/web-components/issues
[gpr-img]: https://img.shields.io/github/issues-pr-raw/t7/web-components.svg
[gpr-url]: https://github.com/t7/web-components/pulls
