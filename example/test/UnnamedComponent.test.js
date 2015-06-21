// jsx-test
var jsx = require('../../index').jsxTranspile(process.env.COVERAGE);
var assert = require('assert');

describe('UnnamedComponent', function() {
    var UnnamedComponent = require('../UnnamedComponent.jsx');

    describe('#render', function () {
        it('renders with <div>UNNAMED_COMPONENT</div>', function () {
            jsx.assertRender(UnnamedComponent, {}, '<div>UNNAMED_COMPONENT</div>');
        });
    });
});
