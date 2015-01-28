// jsx-test
var jsx = require('../index');

describe('ComponentStub', function() {
    var ComponentStub = jsx.ComponentStub;

    it('renders all props on ul', function () {
        jsx.assertRender(ComponentStub, {}, '---');

        jsx.assertRender(ComponentStub, {
            name: 'Marcelo Eden'
        }, '<li>name = Marcelo Eden</li>');

        jsx.assertRender(ComponentStub, {
            size: 'lg',
            color: 'pink',
            n: 1
        }, '<li>size = lg</li><li>color = pink</li><li>n = 1</li>');
    });
});

