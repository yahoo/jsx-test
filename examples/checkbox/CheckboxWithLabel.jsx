/** @jsx React.DOM */
var React = require('react/addons');

module.exports = React.createClass({
    displayName: 'CheckboxWithLabel',

    getDefaultProps: function () {
        return { isChecked: false };
    },

    getInitialState: function() {
        return { isChecked: this.props.isChecked };
    },

    onChange: function() {
        this.setState({isChecked: !this.state.isChecked});
    },

    render: function() {
        return (
            <label>
                <input
                    type="checkbox"
                    checked={this.state.isChecked}
                    onChange={this.onChange}
                />
                {this.state.isChecked ?
                    this.props.labelOn :
                    this.props.labelOff}
            </label>
       );
    }
});
