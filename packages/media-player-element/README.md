# Media Player Element [<img src="https://t7.github.io/web-components/web_components-logo.svg" alt="" width="110" height="90" align="right">][Media Player Element]

[![Build Status][cli-img]][cli-url]
[![Issue Tracker][git-img]][git-url]
[![Pull Requests][gpr-img]][gpr-url]

[Media Player Element] is a [Web Component] for creating tiny, responsive,
international, accessible, easily customizable media players. It will add up to
3.83 kB to your project.

**[Try it now](https://t7.github.io/web-components/media-player-element/)**

---

[Media Player Element] can be controlled with any pointer or keyboard, whether
it’s to play, pause, move across the timeline, mute, unmute, adjust the volume,
enter or leave fullscreen, or download the source.

<p align="center">
  <img src="https://jonathantneal.github.io/media-player/toolbar-classes.png" alt="Diagram of Media Player" width="665" height="116">
</p>

[Media Player Element] is designed for developers who want complete visual
control over the component. It’s also for developers who want to hack at or
extend the player without any fuss. The player itself does all the heavy
lifting; semantic markup, accessibility management, language, fullscreen, text
direction, providing pointer-agnostic scrubbable timelines, and lots of other
cool sounding stuff.

<p align="center">
  <img src="https://jonathantneal.github.io/media-player/time-classes.png" alt="Diagram of Time Slider" width="598" height="82">
</p>

## Usage

Add the Media Player Element to your page.

```html
<script src="https://unpkg.com/@t7/media-player-element"></script>
```

Alternatively, add the Media Player Element to your project:

```sh
npm install @t7/media-player-element
```

```js
import MediaPlayerElement from '@t7/media-player-element';

customElements.define('media-player', MediaPlayerElement);
```

---

This component is still being developed.

[Media Player Element]: https://github.com/t7/web-components/tree/master/packages/media-player-element
[Web Component]: https://github.com/t7/web-components

[cli-img]: https://img.shields.io/travis/t7/web-components/master.svg
[cli-url]: https://travis-ci.org/t7/web-components
[git-img]: https://img.shields.io/github/issues-raw/t7/web-components.svg
[git-url]: https://github.com/t7/web-components/issues
[gpr-img]: https://img.shields.io/github/issues-pr-raw/t7/web-components.svg
[gpr-url]: https://github.com/t7/web-components/pulls
