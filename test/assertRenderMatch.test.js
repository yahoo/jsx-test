// jsx-test
var jsx = require('../index');
var React = require('react');
var createReactClass = require('create-react-class');

var Alert = createReactClass({
    displayName: 'Alert',
    render: function () {
        return React.createElement('div', {
            className: 'alert ' + this.props.className
        }, this.props.message);
    }
});

describe('#assertRenderMatch', function() {
    var props = {
        className: 'notice',
        message: 'Looks good'
    };

    it('asserts using a regex', function () {
        jsx.assertRenderMatch(Alert, props, /<div class="alert \w+">(.+)<\/div>/);
    });

    it('asserts convertion a string to regex', function () {
        jsx.assertRenderMatch(Alert, props, '<div class="\\w+ \\w+">(.+)</div>');
    });
});

describe('#assertNoRenderMatch', function() {
    var props = {
        className: 'notice',
        message: 'Looks good'
    };

    it('asserts using a regex', function () {
        jsx.assertNoRenderMatch(Alert, props, /class="-+"/);
    });

    it('asserts convertion a string to regex', function () {
        jsx.assertNoRenderMatch(Alert, props, 'class="-+"');
    });
});
