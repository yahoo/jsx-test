// jsx-test
var jsx = require('../index');

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

    it('preserves children content the component', function () {
        var ComponentStub = jsx.stubComponent('p');
        jsx.assertRender(ComponentStub, {
            children: 'blah'
        }, '<p>blah</p>');
    });

    it('adds all props to data props', function () {
        var ComponentStub = jsx.stubComponent('a', null, true);

        jsx.assertRender(ComponentStub, {
            name: 'Jake The Dog',
            what: 'is it?'
        }, '<a name="Jake The Dog" data-name="Jake The Dog" what="is it?" data-what="is it?">');
    });
});
