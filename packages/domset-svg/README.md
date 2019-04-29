# Domset+SVG [<img src="https://t7.github.io/web-components/web_components-logo.svg" alt="" width="110" height="90" align="right">][Domset+SVG]

[![Build Status][cli-img]][cli-url]
[![Issue Tracker][git-img]][git-url]
[![Pull Requests][gpr-img]][gpr-url]

[Domset+SVG] is a JavaScript function for creating DOM elements, including SVG
elements. The function receives element, attribute, and child arguments and
returns a DOM Element. It will add up to 345 bytes to your project.

```js
domset(element, attributes, ...children);
```

**[Try it now](https://t7.github.io/web-components/domset-svg/)**

---

When converting JSX to JS, [Domset+SVG] can be used to generate DOM Elements.

```jsx
<h3>Hello, <strong title="Earthly Planet">World</strong>! This is generated content!</h3>;

/* becomes */

domset('h3', null,
  'Hello, ', domset('strong', { title: 'Earthly Planet' },
    'World'
  ), '! This is generated content!'
);
```

## Usage

Add **Domset+SVG** to your page.

```html
<script src="https://unpkg.com/@t7/domset-svg"></script>
<body>
  <script>
  domset(document.body, null,
    // append <h3>Hello, <strong title="Earthly Planet">World</strong>! This is generated content!</h3>
    domset('h3', null,
      'Hello, ', domset('strong', { title: 'Earthly Planet' },
        'World'
      ), '! This is generated content!'
    ),
    // append <svg><path d="M4 0l24 16L4 32" /></svg>
    domset('svg', { viewBox: '0 0 32 32' },
      domset('path', { d: 'M4 0l24 16L4 32' })
    )
  );
  </script>
</body>
```

Alternatively, add Domset+SVG to your project:

```sh
npm install @t7/domset-svg
```

```js
import domset from '@t7/domset-svg';

// append <h3>Hello, <strong title="Earthly Planet">World</strong>!</h3>
domset(document.body, null,
  domset('h3', null,
    'Hello, ', domset('strong', { title: 'Earthly Planet' },
      'World'
    ), '!')
);

// append <svg><path d="M4 0l24 16L4 32" /></svg>
domset(document.body, null,
  domset('svg', { viewBox: '0 0 32 32' },
    domset('path', { d: 'M4 0l24 16L4 32' })
  )
);
```

## Arguments

### id

The first argument represents the Node being referenced or created. String
arguments create new Elements using the string as the tag name.

```js
// create <h3 /> using the "h3" string
domset('h3');

// create <svg /> using the "svg" string
domset('svg');
```

```js
// use the created <h3 />
domset(document.createElement('h3'));

// use the created <svg />
domset(document.createElementNS('http://www.w3.org/2000/svg', 'svg'));
```

### attributes

The second argument represents the properties or attributes being assigned to
the element. When a name exists on the element as a property then the property
is assigned. Otherwise, the attribute is assigned. Attributes with a `null`
value are removed from the element.

```js
// create <h3 class="foo" /> using the "className" property
domset('h3', { className: 'foo' });
```

```js
// create <h3 class="foo" /> using the "class" attribute
domset('h3', { class: 'foo' });
```

```js
// create <h3 /> with a click event using the "onclick" property
domset('h3', { onclick(event) {} });
```

### children

The third argument and all arguments afterward are children to be appended to
the element.

```js
// append "Hello World" as a text node to <h3>
domset('h3', null, 'Hello World');
```

```js
// append "Hello World" as 3 text nodes to <h3>
domset('h3', null, 'Hello', ' ', 'World');
```

```js
// append a new <h3> to the fragment
domset(document.createDocumentFragment(), null, domset('h3'));
```

## Return

Domset+SVG returns the element referenced or created by [element](#element).

```js
// h3 is <h3 />
const h3 = domset('h3');

// h3ish3 is true
const ish3h3 = h3 === domset(h3);
```

[Domset+SVG]: https://github.com/t7/web-components/tree/master/packages/domset-svg

[cli-img]: https://img.shields.io/travis/t7/web-components/master.svg
[cli-url]: https://travis-ci.org/t7/web-components
[git-img]: https://img.shields.io/github/issues-raw/t7/web-components.svg
[git-url]: https://github.com/t7/web-components/issues
[gpr-img]: https://img.shields.io/github/issues-pr-raw/t7/web-components.svg
[gpr-url]: https://github.com/t7/web-components/pulls
