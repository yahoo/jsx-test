// jsx-test
var jsx = require('../index');
var React = require('react');
var createReactClass = require('create-react-class');

describe('#assertRender', function() {
    var Alert = createReactClass({
        displayName: 'Alert',
        render: function () {
            return React.createElement('div', {
                className: 'alert ' + this.props.className
            }, this.props.message);
        }
    });

    it('renders the exact HTML', function () {
        jsx.assertRender(Alert, {
            className: 'notice',
            message: 'Looks good'
        }, '<div class="alert notice">Looks good</div>');

        jsx.assertRender(Alert, {
            className: 'warning',
            message: 'Looks weird'
        }, '<div class="alert warning">Looks weird</div>');
    });

    it('renders the attomic classes HTML', function () {
        jsx.assertRender(Alert, {
            className: 'P(10px) C($blue)'
        }, '<div class="alert P(10px) C($blue)"></div>');
    });

    it('should handle data-react-* truncation correctly', function () {
        var Alerts = createReactClass({
            displayName: 'Alerts',
            render: function () {
                return React.createElement('div', null, [
                    // Note the space in the key
                    React.createElement(Alert, { message: 'foo bar', key: 'foo bar' }),
                    React.createElement(Alert, { message: 'foo2 bar2', key: 'foo bar2' })
                ]);
            }
        });

        jsx.assertRender(Alerts, null, '<div><div+>foo*</div><div+>foo2 bar2</div></div>');
    });

    it('includes some expecific content on the rendered HTML', function () {
        var props = {
            className: 'notice',
            message: 'Looks good'
        };

        jsx.assertRender(Alert, props, 'Looks good');
        jsx.assertRender(Alert, props, 'class="alert notice"');
        jsx.assertRender(Alert, props, 'div');
    });

    it('matches a regex on the rendered HTML', function () {
        var props = {
            className: 'notice',
            message: 'Looks good'
        };

        // use + to match atributes of a tag
        jsx.assertRender(Alert, props, '<div+>Looks good</div>');
        jsx.assertRender(Alert, props, '<div+>Looks good</div>');
        jsx.assertRender(Alert, props, '<+>Looks good</+>');

        // use * to match anything
        jsx.assertRender(Alert, props, '<div*Looks good*div>');
        jsx.assertRender(Alert, props, '<div*Looks good*div>');
        jsx.assertRender(Alert, props, '<div class="alert notice">*</div>');

        // use + and * just to show off
        jsx.assertRender(Alert, props, '<div+>* good</div>');
    });
});
