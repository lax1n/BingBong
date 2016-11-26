import React, { Component } from 'react';
import {Glyphicon, Button, ButtonGroup, SplitButton, MenuItem, Row, Col, Checkbox, Panel} from 'react-bootstrap';

import '../../styles/components/query/advanced.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Advanced extends Component {
    constructor(props){
        super(props);

        this.state = this.props.advancedParams;

        this.updateLooseParams = this.updateLooseParams.bind(this);
        this.updateMaxTypos = this.updateMaxTypos.bind(this);
    }

    componentDidUpdate(){
        this.props.updateAdvancedParams(this.state);
    }

    updateLooseParams(obj){
        let looseParams = [];
        obj.forEach((element) => {
            looseParams.push(element.value)
        });
        this.setState({looseParams: looseParams});
    }

    updateMaxTypos(obj){
        this.setState({maxTypos: obj.value});
    }

    toggleTypos(){
        this.setState({typos: !this.state.typos});
    }

    render(){
        const attributes = [
            {value: 'First name', label: 'First name'},
            {value: 'Last name', label: 'Last name'},
            {value: 'Date of birth', label: 'Date of birth'},
            {value: 'Mother maiden name', label: 'Mother maiden name'},
            {value: 'Address', label: 'Address'},
            {value: 'Residence location', label: 'Residence location'},
            {value: 'Occupation', label: 'Occupation'},
        ];

        const typoValues= [
            {value: 1, label: '1'},
            {value: 2, label: '2'},
            {value: 3, label: '3'},
        ];
        return (
            <Panel collapsible expanded={this.props.advancedActive}>
                <Row className='text-left'>
                    <Col sm={12}>

                    </Col>
                    <Col sm={4}>
                        <Col sm={12} className='p-0'>
                            <label>Typos</label>
                        </Col>
                        <Checkbox defaultChecked={this.state.typos} onClick={(e) => this.toggleTypos()}>Check for typos</Checkbox>
                        <Select
                            className='m-b-sm'
                            name='max-typos'
                            value={this.state.maxTypos}
                            searchable={false}
                            clearable={false}
                            options={typoValues}
                            disabled={!this.state.typos}
                            onChange={this.updateMaxTypos}
                        />
                        <Select
                            name='loose-params'
                            value={this.state.looseParams}
                            options={attributes}
                            multi={true}
                            disabled={!this.state.typos}
                            onChange={this.updateLooseParams}
                        />
                    </Col>
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

export default Advanced
