# CSS-CLASSNAME

[![Version](http://img.shields.io/npm/v/css-classname.svg)](https://www.npmjs.org/package/css-classname)
[![Build Status](https://travis-ci.org/alexanderlarin/css-classname.svg?branch=master)](https://travis-ci.org/alexanderlarin/css-classname)

The purpose of this package is to simplify the combination of [CSS](https://github.com/css-modules/css-modules) class names for React.js components. It is intended for frontend (isomorphic backend) with such technologies as React.js, [Webpack](https://webpack.github.io/), [ES2015](https://babeljs.io/docs/learn-es2015/). But certainly it can also be used for simple frontend development in clean nodejs.

Studying of the similar projects has shown that most developers complicate the task by too much digging into it, which, in some cases, results in a redundant code and an awkward syntax. Our aim is to avoid this unrequited redundancy and complexity and provide a good functional solution based on a simple and clean code.

**The package has very lighweight, fast, clean and simple implementation and also has no any external dependencies.**

## Motivation
This package is the replacement for `classSet`, which was originally shipped in the React.js Addons bundle.

One of its primary use cases is to make dynamic and conditional `className` for React component props simpler to work with (especially more so than conditional string manipulation). So where you may have the following code to generate a `className` prop for a `<button>` in React:

```js
var Button = React.createClass({
  // ...
  render () {
    var btnClass = 'btn';
    if (this.state.isPressed)
      btnClass += ' btn-pressed';
    else if (this.state.isHovered)
      btnClass += ' btn-over';
    return <button className={btnClass}>{this.props.label}</button>;
  }
});
```

You can express the conditional classes as an `Object` more simply:
```js
var classJoin = require('css-classname').classJoin;

var Button = React.createClass({
  render () {
    var btnClass = classJoin({
      'btn': true,
      'btn-pressed': this.state.isPressed,
      'btn-over': !this.state.isPressed && this.state.isHovered
    });
    return <button className={btnClass}>{this.props.label}</button>;
  }
});
```

As you can compound `Object`, `Array`, and `String` arguments supporting optional `className` props is also simpler since only truthy arguments get included in the result:

```js
var btnClass = classJoin('btn', this.props.className, {
	'btn-pressed': this.state.isPressed,
	'btn-over': !this.state.isPressed && this.state.isHovered
});
```

But when using React.js with Babel ES2015 syntax and [CSS-modules](https://github.com/css-modules/css-modules) you also face a problem with mapping class names from your imported CSS file, because all `className` identifiers should be mapped in dependency on `import styles from 'style.css` module. The package has clear and elegant solution to it:
```javascript
import { className } from 'css-classname';

const styles = {
	container: 'map-container',
	content: 'map-content',
	modal: 'map-modal'
}; // fake import styles from 'Style.css'

const className = className(styles, 
	'container', ['content'], { modal: true });
// => "map-container map-content map-modal"
```

## Getting Started
Install the package to your project using [npm](https://www.npmjs.com) manager as follows:
```sh
npm install css-classname —save
```
and then just import [css-classname](https://www.npmjs.com/css-classname) necessary utilities to your project:
```javascript
import { className, classJoin } from 'css-classname';
```
or for not ES2015 syntax:
```javascript
var className = require('css-classname').className;
var classJoin = require('css-classname').classJoin;
```

## Usage
```javascript
// Babel with ES2015 required
// classJoin()
classJoin('container', 'content'); // => 'container content'
classJoin('container', { inverted: true, 
	small: false }); // => 'container inverted'
classJoin(null, false, 'content', 
	undefined, 0, 1, { baz: null }, ''); // => 'content'
    
// className()
const styles = {
	container: 'map-container',
    content: 'map-content',
	inverted: 'map-inverted'
}; // fake import styles from 'Style.css'

className(styles, 'container', 'content'); // => 'map-container map-content'
className(styles, 'container', 
	{ inverted: true, small: false }); // => 'map-container map-inverted'
className(styles, null, false, 
	'content', undefined, 0, 1, { baz: null }, ''); // => 'map-content'
```

Further you can combine the output from `className` and `classJoin` functions as follows:

```javascript
// Babel with ES2015 required
const styles = {
	container: 'map-container',
	inverted: 'map-inverted',
}; // fake import styles from 'Style.css'

const style = 'component-content'; // another className already mapped with another .css file

classJoin(className(styles, 
	'container', { 'inverted': true }), style); // => 'map-container map-content component-content'
```
For more information on usage please visit `test` directory in the project [repository](https://github.com/alexanderlarin/css-classname).

## API
The API package contains the following functions that will have `String` result of combination of arguments CSS class names:
|Function |Arguments |
|-----------|------------------------------------------------------------------|
|`classJoin`|`...args: Object|Array|string` &mdash; CSS class names |
|`className`|`styles: Object` &mdash; imported CSS module object
|           |`...args: Object|Array|string` &mdash; CSS class names |

**The main difference between `className` and `classJoin` functions is that the first one should have `styles` object as first the parameter and the second shouldn't**

As you can see the `className` and `classJoin` functions takes any number of arguments organized as a `String`, `Object`, `Array` or even an `Array of Objects`.
The argument `'foo'` is short for `{
foo: true }`. **If the value of the key is falsy, it won't be included in the result `String`. This is the key feature of package since you can use some logic in your CSS class name objects**

## Examples
If you are using [CSS-modules](https://github.com/css-modules/css-modules) concept with react.js and ES2015 syntax see the example below:
```javascript
// ./Menu.jsx
import React from 'react';
import { className, classJoin } from 'css-classname';
import styles from './Menu.css';

export class MenuComponent extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    size: React.PropTypes.oneOf(['small', 'medium', 'large']),
    inverted: React.PropTypes.bool
  };
  static defaultProps = {
  	inverted: false
  };
  render() {
    return (
      <div className={ classJoin(this.props.className, 
          className(styles, 'container', 
          this.props.size { 'inverted': this.props.inverted }) }>
          { this.props.children }
      </div>
    );
	}
}
```

## License
[MIT](LICENSE). Copyright (c) 2016 Alexander Larin