// Link.react.js
import React from "react";

const STATUS = {
    HOVERED: "hovered",
    NORMAL: "normal",
    test: []
};

export default class Link extends React.Component {
    constructor(props) {
        super(props);

        this._onMouseEnter = this._onMouseEnter.bind(this);
        this._onMouseLeave = this._onMouseLeave.bind(this);

        this.state = {
            class: STATUS.NORMAL,
        };
    }

    _onMouseEnter() {
        this.setState({class: STATUS.HOVERED});
    }

    _onMouseLeave() {
        this.setState({class: STATUS.NORMAL});
    }

    render() {
        return (
            <a
                className={this.state.class}
                /* eslint-disable-next-line react/prop-types */
                href={this.props.page || "#"}
                onMouseEnter={this._onMouseEnter}
                onMouseLeave={this._onMouseLeave}
            >
                {/* eslint-disable-next-line react/prop-types */}
                {this.props.children}
            </a>
        );
    }
}