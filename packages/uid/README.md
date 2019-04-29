# uid [<img src="https://t7.github.io/web-components/web_components-logo.svg" alt="" width="110" height="90" align="right">][uid]

[![Build Status][cli-img]][cli-url]
[![Issue Tracker][git-img]][git-url]
[![Pull Requests][gpr-img]][gpr-url]

[uid] is a JavaScript function for creating unique URL-safe IDs. It will add up
to 184 bytes to your project.

```js
uid(5);  // 1 second at 4000 IDs per second to have a 1% probability of at least one collision
uid(11); // 4 days at 4000 IDs per second to have a 1% probability of at least one collision
uid(21); // 10 million years at 4000 IDs per second to have a 1% probability of at least one collision
```

**[Try it now](https://t7.github.io/web-components/domset/)**

## Usage

Add uid to your page.

```html
<script src="https://unpkg.com/@t7/uid"></script>
<body>
  <script>
  // give <body> a unique ID like "wAl_Hh9fYReEakFYN-7qr"
  document.body.id = uid(21);
  </script>
</body>
```

Alternatively, add uid to your project:

```sh
npm install @t7/uid
```

```js
import uid from '@t7/uid';

// give <body> a unique ID like "wAl_Hh9fYReEakFYN-7qr"
document.body.id = uid(21);
```

## Arguments

### size

The first argument represents the size of the ID being generated.

```js
// 1 second at 4000 IDs per second to have a 1% probability of at least one collision
uid(5);
```

```js
// 4 days at 4000 IDs per second to have a 1% probability of at least one collision
uid(11); 
```

```js
// 10 million years at 4000 IDs per second to have a 1% probability of at least one collision
uid(21); 
```

## Return

uid returns a unique URL-safe ID.

```js
// a unique ID like "wVC-s"
uid(5);
```

```js
// a unique ID like "PEqV6F96R-4"
uid(11);
```

```js
// a unique ID like "wAl_Hh9fYReEakFYN-7qr"
uid(21); 
```

[uid]: https://github.com/t7/web-components/tree/master/packages/uid

[cli-img]: https://img.shields.io/travis/t7/web-components/master.svg
[cli-url]: https://travis-ci.org/t7/web-components
[git-img]: https://img.shields.io/github/issues-raw/t7/web-components.svg
[git-url]: https://github.com/t7/web-components/issues
[gpr-img]: https://img.shields.io/github/issues-pr-raw/t7/web-components.svg
[gpr-url]: https://github.com/t7/web-components/pulls
