import React, { Component } from 'react';
import {Glyphicon, Button, ButtonGroup, SplitButton, MenuItem, Row, Col, Checkbox} from 'react-bootstrap';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class Advanced extends Component {
    constructor(props){
        super(props);

        this.state = {
            active: false,
        }

        this.renderFilters = this.renderFilters.bind(this);
    }

    toggleActive(e){
        e.preventDefault();
        this.setState({active: !this.state.active});
    }

    renderFilters(){
        if(!this.state.active){
            return '';
        }
        return (
            <Row>
                <Row>
                    <Col sm={4}>
                        <Checkbox>Check for typos</Checkbox>
                        <Checkbox>Check for typos</Checkbox>
                        <Checkbox>Check for typos</Checkbox>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Checkbox>Check for typos</Checkbox>
                        <Checkbox>Check for typos</Checkbox>
                        <Checkbox>Check for typos</Checkbox>
                    </Col>
                </Row>
                <Row>
                    <Col sm={4}>
                        <Checkbox>Check for typos</Checkbox>
                        <Checkbox>Check for typos</Checkbox>
                        <Checkbox>Check for typos</Checkbox>
                    </Col>
                </Row>
            </Row>
        );
    }

    render(){
        return (
            <Col sm={12}>
                <a onClick={this.toggleActive.bind(this)}>+ Advanced</a>
                <ReactCSSTransitionGroup
                  transitionName="example"
                  transitionEnterTimeout={500}
                  transitionLeaveTimeout={300}>
                  {this.renderFilters()}
                </ReactCSSTransitionGroup>
            </Col>
        );
    }
}

export default Advanced
