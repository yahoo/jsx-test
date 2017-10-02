// jsx-test
var jsx = require('../index');
var React = require('react');
var createReactClass = require('create-react-class');
var assert = require('assert');

var Component = createReactClass({
    displayName: 'TestComp',
    render: function () {
        var props = {
            className: 'test-class'
        };
        var children = [
            React.createElement('li', props),
            React.createElement('li', props),
            React.createElement('li', props),
        ];
        return React.createElement('ul', {}, children);
    }
});

describe('#elementQuerySelector', function () {
    it('finds the element on the component', function () {
        var comp = jsx.renderComponent(Component);

        var child = jsx.elementQuerySelector(comp, '.test-class');
        assert.equal(child.tagName, 'LI');
    });
});

describe('#elementQuerySelectorAll', function () {
    it('finds the element on the component', function () {
        var comp = jsx.renderComponent(Component);

        var children = jsx.elementQuerySelectorAll(comp, '.test-class');
        assert.equal(children.length, 3);
    });
});
