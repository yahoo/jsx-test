// jsx-test
var jsx = require('../index');
var React = require('react');
var assert = require('assert');

var Component = React.createClass({
    displayName: 'TestComp',
    propTypes: {
        foo: React.PropTypes.string
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
        assert.equal(comp.getDOMNode().textContent, 'child');
        assert.equal(comp.getDOMNode().getAttribute('data-foo'), 'bar');

        jsx.unmountComponent(comp);
        assert.notEqual(comp.isMounted(), true);
    });
});
