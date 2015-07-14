// jsx-test
var jsx = require('../index');
var React = require('react');
var assert = require('assert');

var Component = React.createClass({
    displayName: 'TestComp',
    render: function () {
        return React.createElement('button', this.props);
    }
});

describe('#simulateEvent', function () {
    it('simulates an event', function () {
        var clickCount = 0;
        var clickHandler = function () {
            clickCount++;
        };
        var comp = jsx.renderComponent(Component, {
            onClick: clickHandler
        });

        jsx.simulateEvent(comp, 'click');

        assert.equal(clickCount, 1);
    });
});

describe('#simulateNativeEvent', function () {
    it('simulates an event', function () {
        var clickCount = 0;
        var clickHandler = function () {
            clickCount++;
        };
        var comp = jsx.renderComponent(Component, {
            onClick: clickHandler
        });

        jsx.simulateNativeEvent(comp, 'click');

        assert.equal(clickCount, 1);
    });
});
