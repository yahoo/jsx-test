// jsx-test
var jsx = require('../index');
var React = require('react/addons');
var assert = require('assert');

describe('#withContext', function() {
    it('gives child context', function () {
        var ContextUser = React.createClass({
            contextTypes: {
                method: React.PropTypes.func
            },
            render: function () {
                return React.createElement('span', null, this.context.method());
            }
        });

        var context = {
            method: function () {
                return 'Awesome String!';
            }
        };

        jsx.assertRender(jsx.withContext(ContextUser, context), {}, '<span>Awesome String!</span>');
    });

    it('passes props through context wrapper to child', function () {
        var ContextUser = React.createClass({
            render: function () {
                return React.createElement('span', null, this.props.str);
            }
        });

        jsx.assertRender(jsx.withContext(ContextUser, {}), {str: 'Awesome String!'}, '<span>Awesome String!</span>');
    });

    it('creates a readable displayName using Component.displayName', function () {
        var NamedComponent = jsx.stubComponent('Name');

        assert(
            jsx.withContext(NamedComponent, {}).displayName === 'Name:withContext',
            'Expected displayName to equal "Name:withContext"'
        );
    });

    it('creates a readable displayName even if Component did not have one', function () {
        var UnnamedComponent = React.createClass({
            render: function () {return null;}
        });

        assert(
            jsx.withContext(UnnamedComponent, {}).displayName === 'Component:withContext',
            'Expected displayName to equal "Component:withContext"'
        );
    });
});
