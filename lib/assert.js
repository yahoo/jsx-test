'use strict';
var assert = require('assert');
var React = require('react');

function renderToString(Component, props) {
    return React
        .renderToString(React.createElement(Component, props))
        .replace(/\s+data\-react[-\w]+\=[^>\s]+/g, '');
}

function buildRegEx(text) {
    return new RegExp(text
        .replace(/[<>\/\\?=^$]/g, '\\$&')
        .replace(/\*/g, '.*')
        .replace(/\+/g, '[^<>]+')
        .replace(/\s+/g, ' '));
}

/**
 * Assert component render matches the expectedHTML
 * @method assertRender
 *
 * @param {ReactComponent} Component class
 * @param {Object} props used to initialize the component
 * @param {String} expectedHTML can contain wildcards "+" or "*"
 *
 * @example
 * // The code bellow will raise an error unless the component renders
 * // a div with any attributes and the string "something" inside any
 * // inner element.
 * assertRender(MyComponent, {}, "<div+>*something*</div>");
 **/
function assertRender(Component, props, expectedHTML) {
    var expected = renderToString(Component, props);
    var regEx = buildRegEx(expectedHTML);

    assert(
        regEx.test(expected),
        'Expected: ' + expected + ' to match: ' + regEx
    );
}

/**
 * Assert component render to not matches the unexpectedHTML
 * @method assertNotRender
 *
 * @param {ReactComponent} Component class
 * @param {Object} props used to initialize the component
 * @param {String} unexpectedHTML can contain wildcards "+" or "*"
 *
 * @example
 * // The code bellow will raise an error if the component renders
 * // a div with any attributes and the string "something" inside any
 * // inner element.
 * assertNotRender(MyComponent, {}, "<div+>*something*</div>");
 **/
function assertNotRender(Component, props, unexpectedHTML) {
    var expected = renderToString(Component, props);
    var regEx = buildRegEx(unexpectedHTML);

    assert(
        !regEx.test(expected),
        'Expected: ' + expected + ' to NOT match: ' + regEx
    );
}

/**
 * Assert component render includes the expectedHTML
 * @method assertRenderInclude
 * @deprecated use `assertRender` instead
 *
 * @param {ReactComponent} Component class
 * @param {Object} props used to initialize the component
 * @param {String} expectedHTML can contain wildcards "+" or "*"
 **/
function assertRenderInclude(Component, props, expectedHTML) {
    console.warn('WARNING: `assertRenderInclude` is deprecated, please use `assertRender` instead.')
    assertRender(Component, props, expectedHTML);
}

module.exports = {
    renderMatch: assertRender,
    renderNotMatch: assertNotRender,
    renderInclude: assertRenderInclude
};
