// jsx-test
var jsx = require('../index');
var React = require('react');
var createReactClass = require('create-react-class');
var PropTypes = require('prop-types');
var ReactDOM = require('react-dom');
var assert = require('assert');

var Component = createReactClass({
    displayName: 'TestComp',
    propTypes: {
        foo: PropTypes.string
    },
    render: function () {
        var props = {
            'data-foo': this.props.foo
        };
        return React.createElement('div', props, this.props.children);
    }
});

describe('#renderComponent', function() {
    it('renders props & children on the component', function () {
        var comp = jsx.renderComponent(Component, { foo: 'bar' }, 'child');

        // Verify that it's Off by default
        assert.equal(ReactDOM.findDOMNode(comp).textContent, 'child');
        assert.equal(ReactDOM.findDOMNode(comp).getAttribute('data-foo'), 'bar');
    });
});
