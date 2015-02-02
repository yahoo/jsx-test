var React = require('react');

module.exports = React.createClass({
    displayName: 'CheckboxWithLabel',

    getDefaultProps: function () {
        return {
            labelOn: 'On',
            labelOff: 'Off',
            isChecked: false
        };
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
