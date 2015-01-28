var React = require('react');

module.exports = React.createClass({
    displayName: 'ComponentStub',

    builtPropsList: function () {
        var keys = Object.keys(this.props);
        return (keys.length) ? keys.map(function (key) {
            return (<li key={key}>{key + " = " + this.props[key]}</li>);
        }.bind(this)) : (<li>---</li>);
    },

    render: function () {
        return <ul>{this.builtPropsList()}</ul>;
    }
});
