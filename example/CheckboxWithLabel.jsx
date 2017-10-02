var React = require('react');
var createReactClass = require('create-react-class');

module.exports = createReactClass({
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

    onHover: function () {
        this.setState({isHover: true});
    },

    onHoverLeave: function () {
        this.setState({isHover: false});
    },

    render: function() {
        return (
            <label onMouseOver={this.onHover} onMouseOut={this.onHoverLeave}>
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
