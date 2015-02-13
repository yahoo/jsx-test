// jsx-test
var assert = require('assert');
var jsx = require('../index');

describe('jsxTest', function () {
    describe('#stubComponent', function() {
        it('renders props on the component', function () {
            var ComponentStub = jsx.stubComponent('div');

            jsx.assertRender(ComponentStub, {
                name: 'Marcelo Eden',
                className: 'big'
            }, '<div name="Marcelo Eden" class="big"></div>');
        });

        it('renders children content the component', function () {
            var ComponentStub = jsx.stubComponent('p', 'hello world!');
            jsx.assertRender(ComponentStub, {}, '<p>hello world!</p>');
        });

        it('asserts the properties', function () {
            var ComponentStub = jsx.stubComponent('a', null, {name: "Jake The Dog"});

            assert.throws(function () {
                jsx.assertRender(ComponentStub, {}, 'a');
            });

            assert.doesNotThrow(function () {
                jsx.assertRender(ComponentStub, {name: 'Jake The Dog'}, 'a');
            });

            assert.doesNotThrow(function () {
                jsx.assertRender(ComponentStub, {
                    name: 'Jake The Dog',
                    className: 'btn'
                }, 'a');
            });
        });
    });
});
