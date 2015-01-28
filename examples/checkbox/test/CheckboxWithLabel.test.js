// jsx-test
var jsx = require('../../../index');
var assert = require('assert');

describe('CheckboxWithLabel', function() {
    var CheckboxWithLabel = require('../CheckboxWithLabel.jsx');

    it('changes the text after click', function() {
        // Render a checkbox with label in the document
        var checkbox = jsx.renderComponent(CheckboxWithLabel, {
            labelOn: "On",
            labelOff: "Off",
        });

        // Verify that it's Off by default
        assert.equal(checkbox.getDOMNode().textContent, 'Off');

        // Simulate a click and verify that it is now On
        var input = jsx.elementQuerySelector(checkbox, 'input');

        // Toggle On
        jsx.simulateEvent(input, 'change');
        assert.equal(checkbox.getDOMNode().textContent, 'On');

        // Toggle Off again
        jsx.simulateEvent(input, 'change');
        assert.equal(checkbox.getDOMNode().textContent, 'Off');
    });

    describe('#render', function () {
        it('renders with a custom label OFF', function () {
            jsx.assertRender(CheckboxWithLabel, {
                labelOff: 'I am OFF',
                isChecked: false
            }, 'I am OFF')

            jsx.assertRender(CheckboxWithLabel, {
                labelOff: 'Offline',
                isChecked: false
            }, 'Offline')
        });

        it('renders with a custom label ON', function () {
            jsx.assertRender(CheckboxWithLabel, {
                labelOn: 'I am ON',
                isChecked: true
            }, 'I am ON')

            jsx.assertRender(CheckboxWithLabel, {
                labelOn: 'Online',
                isChecked: true
            }, 'Online')
        });

        it('renders with a checkbox field', function () {
            jsx.assertRender(CheckboxWithLabel, {}, '<input type="checkbox">');

            jsx.assertRenderInclude(CheckboxWithLabel, {
                isChecked: true
            }, '<input type="checkbox" checked>');
        });
    });
});
