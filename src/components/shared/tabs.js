import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap';

class TabBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            tabKey: 1,
        }

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(eventKey){
        event.preventDefault();
        this.setState({tabKey: eventKey});
    }

    render() {
        return (
            <Tabs
                id="select-deduplicator"
                activeKey={this.state.tabKey}
                onSelect={this.handleSelect}>
                <Tab eventKey={1} title="Tracked Entity Instances">PLEASE WORK</Tab>
                <Tab eventKey={2} title="Singletons">HUUUUUUUUUUUUUUU</Tab>
            </Tabs>
        );
    }
}

export default TabBar;
