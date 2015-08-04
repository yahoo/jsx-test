# jsx-test
[![npm version](https://img.shields.io/npm/v/jsx-test.svg?style=flat-square)](https://www.npmjs.com/package/jsx-test)
[![Build Status](https://travis-ci.org/yahoo/jsx-test.svg?branch=master)](https://travis-ci.org/yahoo/jsx-test)
[![Dependency Status](https://img.shields.io/david/yahoo/jsx-test.svg?style=flat-square)](https://david-dm.org/yahoo/jsx-test)
[![devDependency Status](https://img.shields.io/david/dev/yahoo/jsx-test.svg?style=flat-square)](https://david-dm.org/yahoo/jsx-test#info=devDependencies)

`jsx-test` is a tool that makes it easy to test '.jsx' files and includes some helpers for testing react components.

The main features of `jsx-test` are:

* Includes some helpers to simplify the test of React Components.
* Assertion methods to check the component renders the correct html based on the given `props`.
* Does NOT automock your dependencies.
* Is much simpler and faster than Jest.
* Works with `mocha`, `jasmine` or any other test framework.

*Note:* If you would like to require jsx files directly please follow [these instructions](https://babeljs.io/docs/setup/)

## Install

```
npm install --save-dev jsx-test
```

## Usage
### simulateEvent
```js
simulateEvent(ReactComponent element, String event, Object? eventData)
simulateEvent(DOMElement element, String event, Object? eventData)
```

Simulates an `event` on an `element`.

### renderComponent
```js
ReactElement renderComponent(ReactComponent comp, Object? props, any? children)
```

Renders a component w/ its props and children.

### unmountComponent
```js
Boolean unmountComponent(ReactComponent comp)
```

Unmount a component.

### elementQuerySelector
```js
DOMElement elementQuerySelector(ReactComponent comp, String selector)
```

Gets 1st child of `comp` using selector `selector`

### elementQuerySelectorAll
```js
DOMElement[] elementQuerySelectorAll(ReactComponent comp, String selector)
```

Gets children of `comp` using selector `selector`

### stubComponent
```js
ReactComponent stubComponent(ReactElement tag, any? children, boolean? showDataProps)
ReactComponent stubComponent(String tag, any? children, boolean? showDataProps)
```
Creates a stub component with `tag` and its `children`. If `showDataProps` is true, all props will be set in the rendered `DOMElement` in the form of `data-<propKey> = <propValue>`.

### withContext
```js
ReactComponent withContext(ReactComponent Component, Object context)
```
Wraps component in a context creating component.

### assertRender
```js
assertRender(ReactComponent Component, Object props, String expectedHTML)
```
Assert component render matches the `expectedHTML`. The `expectedHTML` regex conversion can be seen [here](https://github.com/yahoo/jsx-test/blob/master/test/assertRender.test.js).

### assertNotRender
```js
assertNotRender(ReactComponent Component, Object props, String unexpectedHTML)
```
The reverse of `assertRender`.

## Example

Check our [examples](https://github.com/3den/jsx-test/tree/master/example) and [tests](https://github.com/3den/jsx-test/tree/master/test).
