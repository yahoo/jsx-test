'use strict';
var React = require('react');
var createReactClass = require('create-react-class');
var PropTypes = require('prop-types');
var ReactDOM = require('react-dom');
var ReactTestUtils = require('react-dom/test-utils');


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
    return ReactDOM.render(element, appContainer)
}

/**
 * Unmount a component.
 *
 * @method unmountComponent
 * @param {ReactElement} the element to be unmounted
 * @return {Boolean} true if a component was unmounted
 **/
function unmountComponent(element) {
    return ReactDOM.unmountComponentAtNode(appContainer);
}

/**
 * Simulates an event triggered on given element
 *
 * @method simulateEvent
 * @param {ReactElement or DOMNode} element that will trigger the event
 * @param {String} event that will be triggered
 * @param {Object} data that will be sent to the event
 **/
function simulateEvent(element, event, data) {
    ReactTestUtils.Simulate[event](
       ReactDOM.findDOMNode(element) || element,
       data
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
    console.warn('simulateNativeEvent: is dreprecated in React 0.14')
    ReactTestUtils.SimulateNative[event](
       ReactDOM.findDOMNode(element) || element
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
    return ReactDOM.findDOMNode(element).querySelector(query);
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
    return ReactDOM.findDOMNode(element).querySelectorAll(query);
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
    return createReactClass({
        displayName: tag.displayName || tag,

        getStubProps: function () {
            var props = this.props;

            return Object.keys(props).reduce(function (clonedProps, key) {
                clonedProps[key] = props[key];
                if (showDataProps) {
                    clonedProps['data-' + key.toLowerCase()] = props[key];
                }
                return clonedProps;
            }, {});
        },

        render: function () {
            return React.createElement(
                tag,
                this.getStubProps(),
                this.props.children || children
            );
        }
    });
}

/**
 * wraps component in a context creating component
 *
 * @method withcontext
 * @param {reactcomponent} component class
 * @param {object} context the context to be passed to component
 * @return {reactcomponent} react class with context setup
 **/
function withContext(Component, context) {
    var childContextTypes = {};

    // Do not use hasOwnProperty, we need all keys from the entire prototype chain
    for (var key in context) {
        childContextTypes[key] = PropTypes.any;
    }

    return createReactClass({
        displayName: (Component.displayName || 'Component') + ':withContext',
        childContextTypes: childContextTypes,
        getDefaultProps: function () {
            return {
                ref: 'child'
            };
        },
        runChildMethod: function (name, args) {
            var child = this.refs.child;
            return child[name].apply(child, args);
        },
        getChildContext: function () {
            return context;
        },
        render: function () {
            return React.createElement(Component, this.props);
        }
    });
}

function instrumentCode(code, filename) {
    var createInstrumenter = require('istanbul-lib-instrument').createInstrumenter;
    return createInstrumenter().instrumentSync(code, filename);
}
/**
 * Compiles jsx files on require
 * this method is not needed if you are using babel
 *
 * @method jsxTranspile
 * @param {Boolean} instrument the original code
 **/
function jsxTranspile(instrument) {
    var fs = require('fs');
    var babel = require('babel-core');

    require.extensions['.jsx'] = function (module, filename) {
        var content = fs.readFileSync(filename, 'utf8');
        var code = babel.transform(content, {
            presets: ['react'],
            retainLines: true
        }).code;

        if (
            instrument &&
            instrument !== 'false' &&
            !/(tests|node_modules)/.test(filename)
        ) {
            code = instrumentCode(code, filename);
        }

        return module._compile(code, filename);
    };

    return this;
}

/**
 * @module helper
 **/
module.exports = {
    simulateEvent: simulateEvent,
    simulateNativeEvent: simulateNativeEvent,
    renderComponent: renderComponent,
    unmountComponent: unmountComponent,
    elementQuerySelector: elementQuerySelector,
    elementQuerySelectorAll: elementQuerySelectorAll,
    stubComponent: stubComponent,
    withContext: withContext,
    jsxTranspile: jsxTranspile
};
