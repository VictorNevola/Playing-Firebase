import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Header extends Component {
    state = {
        list: []
    }

    componentDidMount() {
        this.props.way !== undefined && this.setState({ list: this.props.way })
    }

    render() {
        return (
            <div>
                {
                    this.state.list.length !== 0 && this.state.list.map((element, index) => {
                        return (
                            <Link key={index} to={element.way}> {element.nameWay}</Link>
                        )
                    })

                }
            </div>
        )
    }
}
