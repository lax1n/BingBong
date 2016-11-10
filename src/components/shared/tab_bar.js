import React, { Component } from 'react';
import {Tabs, Tab} from 'react-bootstrap';

import Instructions from '../shared/instructions.js';

// Import pages to be shown in the different Tabs
import Home from '../pages/home.js';
import Tei from '../pages/tei';
import Singleton from '../pages/singleton';
import About from '../pages/about';


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
                <Tab eventKey={1} title="Home">
                    <Home />
                </Tab>
                <Tab eventKey={2} title="Tracked Entity Instances">
                    <Instructions />
                    <Tei />
                </Tab>
                <Tab eventKey={3} title="Singletons">
                    <Instructions />
                    <Singleton />
                </Tab>
                <Tab eventKey={4} title="About">
                    <About />
                </Tab>
            </Tabs>
        );
    }
}

export default TabBar;
