/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
'use strict';

// Set browser globals, needs to happen before react is required
// You must require jsxTest before any React stuff
const { JSDOM } = require('jsdom');
const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;
global.window = window;
global.document = window.document;
global.appContainer = document.createElement('section');
global.navigator = {
    userAgent: 'node.js'
};
global.Event = window.Event;
document.body.appendChild(appContainer);

// Require other dependencies
var fs = require('fs');

// Require libs
var assert = require('./lib/assert');
var helper = require('./lib/helper');

/**
 * Allow `jsx` files to be required.
 * This module should be required before any React class.
 * @module jsx-test
 *
 * @example
 * var jsx = require('jst-test');
 * var Component = require('path/to/YourComponet.jsx');
 *
 * describe('YourComponet', function () {
 *      ... test your stuff
 * });
 **/
module.exports = {
    // Helpers
    simulateEvent: helper.simulateEvent,
    simulateNativeEvent: helper.simulateNativeEvent,
    renderComponent: helper.renderComponent,
    unmountComponent: helper.unmountComponent,
    elementQuerySelector: helper.elementQuerySelector,
    elementQuerySelectorAll: helper.elementQuerySelectorAll,
    stubComponent: helper.stubComponent,
    withContext: helper.withContext,
    jsxTranspile: helper.jsxTranspile,

    // Assertions
    assertRender: assert.assertRender,
    assertNotRender: assert.assertNotRender,
    assertRenderMatch: assert.assertRenderMatch,
    assertNoRenderMatch: assert.assertNoRenderMatch
};
