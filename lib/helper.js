'use strict';
var React = require('react/addons');
var TestUtils = React.addons.TestUtils;

/**
 * Renders a component. Method signature is the same as
 * https://facebook.github.io/react/docs/top-level-api.html#react.createelement
 *
 * @method renderComponent
 * @param {ReactComponent} Component class
 * @param {Object} props used to initialize the componen
 * @param {Object|Object[]} children children to populate inside Component
 * @return {ReactElement} rendered react element
 **/
function renderComponent() {
    var element = React.createElement.apply(React, arguments);
    return TestUtils.renderIntoDocument(element);
}

/**
 * Simulates an event triggered on given element
 *
 * @method simulateEvent
 * @param {ReactElement or DOMNode} element that will trigger the event
 * @param {String} event that will be triggered
 **/
function simulateEvent(element, event) {
    TestUtils.Simulate[event](
       React.findDOMNode(element) || element
    );
}

/**
 * Simulates an native event on given element
 *
 * @method simulateNativeEvent
 * @param {ReactElement or DOMNode} element that will trigger the event
 * @param {String} event that will be triggered
 **/
function simulateNativeEvent(element, event) {
    TestUtils.SimulateNative[event](
       React.findDOMNode(element) || element
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
    return React.findDOMNode(element).querySelector(query);
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
    return React.findDOMNode(element).querySelectorAll(query);
}

/**
 * Creates a ComponentStub
 *
 * @method stubComponent
 * @param {ReactElement|String} tag element to create
 * @param {Object} assertProps raises an error if component props don't match
 * @return {ReactComponent} ComponentStub
 **/
function stubComponent(tag, children, showDataProps) {
    return React.createClass({
        displayName: tag.displayName || tag,

        componentWillMount: function () {
            showDataProps && this.addDataProps();
        },

        addDataProps: function () {
            Object.keys(this.props).forEach(function (key) {
                this.props['data-' + key] = this.props[key]
            }, this);
        },

        render: function () {
            return React.createElement(tag, this.props, children);
        }
    });
}

/**
 * Wraps component in a context creating component
 *
 * @method withContext
 * @param {ReactComponent} Component class
 * @param {Object} context the context to be passed to Component
 * @return {ReactComponent} react class with context setup
 **/
function withContext(Component, context) {
    var childContextTypes = {};

    // Do not use hasOwnProperty, we need all keys from the entire prototype chain
    for (var key in context) {
        childContextTypes[key] = React.PropTypes.any;
    }

    return React.createClass({
        displayName: (Component.displayName || 'Component') + ':withContext',
        childContextTypes: childContextTypes,
        runChildMethod: function (name, args) {
            var child = this.refs.__child__;
            return child[name].apply(child, args);
        },
        getChildContext: function () {
            return context;
        },
        render: function () {
            this.props.ref = '__child__';
            return React.createElement(Component, this.props);
        }
    });
}

/**
 * @module helper
 **/
module.exports = {
    simulateEvent: simulateEvent,
    simulateNativeEvent: simulateNativeEvent,
    renderComponent: renderComponent,
    elementQuerySelector: elementQuerySelector,
    elementQuerySelectorAll: elementQuerySelectorAll,
    stubComponent: stubComponent,
    withContext: withContext
};
