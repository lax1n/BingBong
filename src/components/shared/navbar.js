import React, { Component } from 'react';
import {Nav, NavItem} from 'react-bootstrap';

class Navbar extends Component {
    constructor(props){
        super(props);

        this.state = {
            tabKey: 1,
        }

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(eventKey){
        //event.preventDefault();
        //console.log(event);
        console.log(eventKey);
    }

    render() {
        return (
            <Nav bsStyle="tabs" activeKey={this.state.tabKey} onSelect={this.handleSelect}>
                <NavItem eventKey="1">B⏀NG</NavItem>
                <NavItem eventKey="2">TEIs</NavItem>
                <NavItem eventKey="3">Singletons</NavItem>
            </Nav>
        );
    }
}

export default Navbar;
