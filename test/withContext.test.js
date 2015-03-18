// jsx-test
var jsx = require('../index');
var React = require('react/addons')

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

        jsx.assertRender(jsx.withContext(context, ContextUser), {}, '<span>Awesome String!</span>');
    });

    it('passes props through context wrapper to child', function () {
        var ContextUser = React.createClass({
            render: function () {
                return React.createElement('span', null, this.props.str);
            }
        });

        jsx.assertRender(jsx.withContext({}, ContextUser), {str: 'Awesome String!'}, '<span>Awesome String!</span>');
    });
});
