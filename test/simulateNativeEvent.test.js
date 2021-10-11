// jsx-test
var jsx = require('../index');
var React = require('react');
var assert = require('assert');

// This has been deprecated for quite some time
// https://github.com/facebook/react/pull/13407
describe.skip('#simulateNativeEvent', function () {
    var Component = jsx.stubComponent('button');

    it('simulates an event', function () {
        var clickCount = 0;

        function clickHandler() {
            clickCount++;
        };

        var comp = jsx.renderComponent(Component, {
            onClick: clickHandler
        });

        jsx.simulateNativeEvent(comp, 'click');
        assert.equal(clickCount, 1);
    });
});
