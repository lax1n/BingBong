import React, { Component } from 'react';
import {Tabs, Tab, Row, Col,} from 'react-bootstrap';
import logo from '../../images/logo_new.png';
import '../../styles/App.css';

// Import pages to be shown in the different Tabs
import Tei from '../pages/tei';
import Singleton from '../pages/singleton';
import About from '../pages/about';


class TabBar extends Component {
    constructor(props){
        super(props);

        this.state = {
            tabKey: 2,
        }

        this.handleSelect = this.handleSelect.bind(this);
    }

    handleSelect(eventKey){
        //event.preventDefault();
        this.setState({tabKey: eventKey});
    }

    render() {
        let show_page="";

        if(this.state.tabKey === 1){
             show_page = <Tei />;
        }
        else if(this.state.tabKey === 2){
            show_page = <Singleton />;
        }
        else{ show_page = <About />; }

        return (

            <div>
                <Row>
                    <div className='App-header'>
                        <Col sm={1}>
                            <img src={logo} className="App-logo" alt="logo" />
                        </Col>
                        <Col sm={10}>
                            <h2 className='App-header-text'>DHIS2 Deduplicator</h2>
                        </Col>
                        <Col sm={1}>
                            <img src={logo} className="App-logo Logo-flip" alt="logo" />
                        </Col>
                    </div>
                </Row>
                <Row>
                    <Col sm={12}>
                            <Tabs
                            justified
                            id="select-deduplicator"
                            activeKey={this.state.tabKey}
                            onSelect={this.handleSelect}>
                            <Tab eventKey={1} title="Tracked Entity Instances" />
                            <Tab eventKey={2} title="Singletons" />
                            <Tab eventKey={3} title="About" />
                        </Tabs>
                        </Col>
                </Row>
                <Row>
                    {show_page}
                </Row>
            </div>
        );
    }
}

export default TabBar;
