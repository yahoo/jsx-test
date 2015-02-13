'use strict';
var assert = require('assert');
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

/**
 * Renders a component
 *
 * @method assertRenderInclude
 * @param {ReactComponent} Component class
 * @param {Object} props used to initialize the component
 * @return {ReactElement} rendered react element
 **/
function renderComponent(Component, props) {
    var element = React.createElement(Component, props);
    return TestUtils.renderIntoDocument(element);
}

/**
 * Simulates an event triggered on given element
 *
 * @method assertRenderInclude
 * @param {ReactElement or DOMNode} element that will trigger the event
 * @param {String} event that will be triggered
 **/
function simulateEvent(element, event) {
    TestUtils.Simulate[event](
       element.getDOMNode ? element.getDOMNode() : element
    );
}

/**
 * Element by query selector
 *
 * @method elementQuerySelector
 * @param {ReactElement} element node where you will search
 * @param {string} query css selector
 * @return {DOMNode} the first DOM node that matches the query
 **/
function elementQuerySelector(element, query) {
    return element.getDOMNode().querySelector(query);
}

/**
 * Elements by query selector
 *
 * @method elementQuerySelectorAll
 * @param {ReactElement} element node where you will search
 * @param {String} query css selector
 * @return {DOMNode} all DOM nodes that matches the query
 **/
function elementQuerySelectorAll(element, query) {
    return element.getDOMNode().querySelectorAll(query);
}

/**
 * Creates a ComponentStub
 *
 * @method stubComponent
 * @param {ReactElement|String} tag element to create
 * @param {Object} assertProps raises an error if component props don't match
 * @return {ReactComponent} ComponentStub
 **/
function stubComponent(tag, children, expectedProps) {
    return React.createClass({
        displayName: tag.displayName || tag,

        componentWillMount: function () {
            expectedProps && this.assertProps(expectedProps);
        },

        assertProps: function (props) {
            Object.keys(props).forEach(function (key) {
                assert.deepEqual(props[key], this.props[key]);
            }, this);
        },

        render: function () {
            return React.createElement(tag, this.props, children);
        }
    });
}

/**
 * @module helper
 **/
module.exports = {
    simulateEvent: simulateEvent,
    renderComponent: renderComponent,
    elementQuerySelector: elementQuerySelector,
    elementQuerySelectorAll: elementQuerySelectorAll,
    stubComponent: stubComponent

};
