// jsx-test
var jsx = require('../index');
var React = require('react');
var PropTypes = require('prop-types');
var createReactClass = require('create-react-class');
var assert = require('assert');

describe('#withContext', function() {
    it('gives child context', function () {
        var ContextUser = createReactClass({
            contextTypes: {
                method: PropTypes.func
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
        var ContextUser = createReactClass({
            render: function () {
                return React.createElement('span', null, this.props.str);
            }
        });

        jsx.assertRender(jsx.withContext(ContextUser, {}), {str: 'Awesome String!'}, '<span>Awesome String!</span>');
    });

    it('allows calling methods from underlying component', function () {
        var UnderlyingComponent = createReactClass({
            underlyingMethod: function (n1, n2) {
                return n1 + n2;
            },
            render: function () {
                return null;
            }
        });

        var wrapper = jsx.renderComponent(jsx.withContext(UnderlyingComponent, {}));
        assert.equal(wrapper.runChildMethod('underlyingMethod', [1, 2]), 3);
    });

    it('creates a readable displayName using Component.displayName', function () {
        var NamedComponent = jsx.stubComponent('Name');
        assert.equal(jsx.withContext(NamedComponent, {}).displayName, 'Name:withContext');
    });

    it('creates a readable displayName even if Component did not have one', function () {
        var UnnamedComponent = require('../example/UnnamedComponent.jsx');
        assert.equal(jsx.withContext(UnnamedComponent, {}).displayName, 'UnnamedComponent:withContext');
    });
});
