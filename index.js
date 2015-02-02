/**
 * Copyright 2014, Yahoo! Inc.
 * Copyrights licensed under the MIT License. See the accompanying LICENSE file for terms.
 */
'use strict';

// Set browser globals, needs to happen before react is required
// You must require jsxTest before any React stuff
var jsdom = require('jsdom');
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = document.parentWindow;
global.navigator = window.navigator;
global.Event = window.Event;

// Require other dependencies
var fs = require('fs');
var ReactTools = require('react-tools');

// Require libs
var assert = require('./lib/assert');
var helper = require('./lib/helper');

// Allows requirea to load `.jsx` files directly
require.extensions['.jsx'] = function(module, filename) {
    var content;
    content = fs.readFileSync(filename, 'utf8');
    var compiled = ReactTools.transform(content, {harmony: true});
    return module._compile(compiled, filename);
};

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
    renderComponent: helper.renderComponent,
    elementQuerySelector: helper.elementQuerySelector,
    elementQuerySelectorAll: helper.elementQuerySelectorAll,

    // Assertions
    assertRender: assert.renderMatch,
    assertNotRender: assert.renderNotMatch,
    assertRenderInclude: assert.renderInclude,

    // Mocks
    ComponentStub: require('./lib/ComponentStub.jsx')
};
