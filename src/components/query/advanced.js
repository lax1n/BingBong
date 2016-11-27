import React, { Component } from 'react';
import {Glyphicon, Button, ButtonGroup,
    SplitButton, MenuItem, Row, Col,
    Checkbox, Panel, OverlayTrigger, Popover} from 'react-bootstrap';

import '../../styles/components/query/advanced.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

import Typos from './advanced/typos'

class Advanced extends Component {
    constructor(props){
        super(props);

        this.updateAdvancedParams = this.updateAdvancedParams.bind(this);
    }

    updateAdvancedParams(category, params){
        let advancedParams = this.props.advancedParams;
        if(category === 'typos'){
            advancedParams.typos = params;
        }

        this.props.updateAdvancedParams(advancedParams);
    }

    render(){
        return (
            <Panel collapsible expanded={this.props.advancedActive}>
                <Row className='text-left'>
                    <Typos
                        typoParams={this.props.advancedParams.typos}
                        updateAdvancedParams={this.updateAdvancedParams}
                    />
                    <Col sm={4}>
                        <Checkbox>Check for typos</Checkbox>
                        <Checkbox>Check for typos</Checkbox>
                        <Checkbox>Check for typos</Checkbox>
                    </Col>
                    <Col sm={4}>
                        <Checkbox>Check for typos</Checkbox>
                        <Checkbox>Check for typos</Checkbox>
                        <Checkbox>Check for typos</Checkbox>
                    </Col>
                </Row>
            </Panel>
        );
    }
}

export default Advanced;
