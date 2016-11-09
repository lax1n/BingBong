import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap';

import SelectPage from '../pages/select';
import Home from './home.js';


class TabBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            tabKey: 1,
        }

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(eventKey){
        //event.preventDefault();
        this.setState({tabKey: eventKey});
    }

    render() {
        return (
            <Tabs
                justified
                id="select-deduplicator"
                activeKey={this.state.tabKey}
                onSelect={this.handleSelect}>
                <Tab eventKey={1} title="Home"><Home /></Tab>
                <Tab eventKey={2} title="Tracked Entity Instances"><SelectPage /></Tab>
                <Tab eventKey={3} title="Singletons"><SelectPage /></Tab>
                <Tab eventKey={4} title="About">
                    <p>Use Tracked Entity Instances to gather duplicates of TEIs </p>
                    <p>Use Singletons to gather duplicates of single events that are not associated with persons</p>
                </Tab>
            </Tabs>
        );
    }
}

export default TabBar;
