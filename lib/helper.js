'use strict';

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
 * @param {string} event that will be triggered
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
 * @param {string} query css selector
 * @return {DOMNode} all DOM node that matches the query
 **/
function elementQuerySelectorAll(element, query) {
    return element.getDOMNode().querySelectorAll(query);
}

/**
 * Returns a node that matched the query
 *
 * @method domQuerySelector
 * @param {string} query css selector
 * @return {DOMNode} the first DOM node that matches the query
 **/
function elementQuerySelector(element, query) {
    return element.getDOMNode().querySelector(query);
}

module.exports = {
    simulateEvent: simulateEvent,
    renderComponent: renderComponent,
    elementQuerySelector: elementQuerySelector,
    elementQuerySelectorAll: elementQuerySelectorAll
};
