// jsx-test
var jsx = require('../index');
var React = require('react');
var assert = require('assert');

describe('#simulateEvent', function () {
    var Component = jsx.stubComponent('button');

    it('simulates an event', function () {
        var clickCount = 0;

        function clickHandler() {
            clickCount++;
        };

        var comp = jsx.renderComponent(Component, {
            onClick: clickHandler
        });

        jsx.simulateEvent(comp, 'click');
        assert.equal(clickCount, 1);

        jsx.simulateEvent(comp, 'click');
        assert.equal(clickCount, 2);
    });

    it('simulates an event with custom options', function () {
        var expected;

        function clickHandler(e) {
            expected = e;
        };

        var comp = jsx.renderComponent(Component, {
            onClick: clickHandler
        });

        jsx.simulateEvent(comp, 'click', {x: 'men'});
        assert.equal(expected.x, 'men');
    });
});
