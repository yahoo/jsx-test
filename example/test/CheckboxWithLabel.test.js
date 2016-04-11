// jsx-test
var ReactDOM = require('react-dom');
var jsx = require('../../index').jsxTranspile(process.env.COVERAGE);
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
        assert.equal(ReactDOM.findDOMNode(checkbox).textContent, 'Off');

        // Simulate a click and verify that it is now On
        var input = jsx.elementQuerySelector(checkbox, 'input');

        // Toggle On
        jsx.simulateEvent(input, 'change');
        assert.equal(ReactDOM.findDOMNode(checkbox).textContent, 'On');

        // Toggle Off again
        jsx.simulateEvent(input, 'change');
        assert.equal(ReactDOM.findDOMNode(checkbox).textContent, 'Off');
    });

    it('triggers native events', function () {
        var checkbox = jsx.renderComponent(CheckboxWithLabel);

        jsx.simulateEvent(checkbox, 'mouseOver');
        assert.equal(checkbox.state.isHover, true);

        jsx.simulateEvent(checkbox, 'mouseOut');
        assert.equal(checkbox.state.isHover, false);
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

        it('does not render a the unchecked label', function () {
            jsx.assertNotRender(CheckboxWithLabel, {
                labelOn: 'On',
                labelOff: 'Off',
                isChecked: false
            }, 'On')

            jsx.assertNotRender(CheckboxWithLabel, {
                labelOn: 'On',
                labelOff: 'Off',
                isChecked: true
            }, 'Off')
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
            jsx.assertRender(CheckboxWithLabel, {}, '<input type="checkbox"+>');

            jsx.assertRender(CheckboxWithLabel, {
                isChecked: true
            }, '<input type="checkbox" checked+>');
        });
    });
});
