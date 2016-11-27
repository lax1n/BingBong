import React, { Component } from 'react';
import {Glyphicon, Col, Checkbox, OverlayTrigger, Popover} from 'react-bootstrap';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Typos extends Component {
    constructor(props){
        super(props);

        this.state = this.props.typoParams;

        this.updateLooseParams = this.updateLooseParams.bind(this);
        this.updateMaxEditDistance = this.updateMaxEditDistance.bind(this);
    }

    componentDidUpdate(){
        this.props.updateAdvancedParams('typos', this.state);
    }

    updateLooseParams(obj){
        let looseParams = [];
        obj.forEach((element) => {
            looseParams.push(element.value)
        });
        this.setState({looseParams: looseParams});
    }

    updateMaxEditDistance(obj){
        this.setState({maxEditDistance: obj.value});
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

        const maxEditDistances= [
            {value: 1, label: '1'},
            {value: 2, label: '2'},
            {value: 3, label: '3'},
        ];

        const popoverMaximumEditDistance = (
            <Popover id='maximum-edit-distance'>
                The <strong>Maximum edit distance</strong> determines how different two attributes can be.
                To find simple typos such as 'Huose' which is supposed to be 'House', a maximum edit distance of 1 is sufficient.
                If you wish to find results with bigger typos than this, you will need to increase this number, but be aware that increasing this will also
                increase the chance of finding duplicates that are not duplicates at all.
            </Popover>
        );

        return (
            <Col sm={4}>
                <Col sm={12} className='p-0'>
                    <label>Typos <Checkbox defaultChecked={this.state.typos} onClick={(e) => this.toggleTypos()}>Check for typos</Checkbox>
                    </label>
                </Col>
                <label>
                    Maximum edit distance <OverlayTrigger trigger='click' overlay={popoverMaximumEditDistance}>
                        <Glyphicon className='clickable' glyph='info-sign' />
                    </OverlayTrigger>
                </label>
                <Select
                    className='m-b-sm'
                    name='max-typos'
                    value={this.state.maxEditDistance}
                    searchable={false}
                    clearable={false}
                    options={maxEditDistances}
                    disabled={!this.state.typos}
                    onChange={this.updateMaxEditDistance}
                />
                <label>Check for typos in the following attributes</label>
                <Select
                    name='loose-params'
                    value={this.state.looseParams}
                    options={attributes}
                    multi={true}
                    disabled={!this.state.typos}
                    onChange={this.updateLooseParams}
                />
            </Col>
        );
    }
}

export default Typos;
