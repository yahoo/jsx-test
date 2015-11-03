'use strict';
var assert = require('assert');
var React = require('react');
var ReactDOMServer = require('react-dom/server');

var REACT_ATTR_REGEX = /\s+data-react[-\w]+=".*?"/g;
var TOKEN_REGEX = /(\*)|(\+)|(\s+)/g;
var ESCAPE_REGEX = /[<>\/\\?=^$()]/g;

function renderToString(Component, props) {
    return ReactDOMServer
        .renderToString(React.createElement(Component, props))
        .replace(REACT_ATTR_REGEX, '');
}

function buildRegEx(text) {
    return new RegExp(text
        .replace(ESCAPE_REGEX, '\\$&')
        .replace(TOKEN_REGEX, function (matcher, star, plus, space) {
            if (star) {
                return '.*';
            }

            if (plus) {
                return '[^<>]+';
            }

            if (space) {
                return ' '
            }
        }));
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
    assertRenderMatch(Component, props, buildRegEx(expectedHTML));
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
    assertNoRenderMatch(Component, props, buildRegEx(unexpectedHTML));
}

/**
 * Assert component render matches the expectedRegex
 * @method assertRenderMatch
 *
 * @param {ReactComponent} Component class
 * @param {Object} props used to initialize the component
 * @param {Regex} expected can contain any regex
 **/
function assertRenderMatch(Component, props, expected) {
    var rendered = renderToString(Component, props);
    var regEx = new RegExp(expected);

    assert(
        regEx.test(rendered),
        '\nExpected: \n' + rendered + '\n\n To match: \n' + regEx
    );
}

/**
 * Assert component render to not matches the unexpectedRegex
 * @method assertNoRenderMatch
 *
 * @param {ReactComponent} Component class
 * @param {Object} props used to initialize the component
 * @param {Regex} unexpected can contain any regex
 **/
function assertNoRenderMatch(Component, props, unexpected) {
    var rendered = renderToString(Component, props);
    var regEx = new RegExp(unexpected);

    assert(
        !regEx.test(rendered),
        '\nExpected: \n' + rendered + '\n\n to NOT match: \n' + regEx
    );
}

module.exports = {
    assertRenderMatch: assertRenderMatch,
    assertNoRenderMatch: assertNoRenderMatch,
    assertRender: assertRender,
    assertNotRender: assertNotRender
};
