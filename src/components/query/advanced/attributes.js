import React, { Component } from 'react';
import {Glyphicon, Col, OverlayTrigger, Popover} from 'react-bootstrap';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Attributes extends Component {
    constructor(props){
        super(props);

        this.updateAllAttributes = this.updateAllAttributes.bind(this);
        this.updateMaxUndefined = this.updateMaxUndefined.bind(this);
        this.updateAttributeParams = this.updateAttributeParams.bind(this);
    }

    updateAttributeParams(params){
        this.props.updateAdvancedParams('attributes', params);
    }

    updateAllAttributes(obj){
        let attributeParams = this.props.attributeParams;
        let attributes = [];
        obj.forEach((element) => {
            attributes.push(element.value)
        });

        attributeParams.attributes = attributes;
        this.updateAttributeParams(attributeParams);
    }

    updateMaxUndefined(obj){
        let attributeParams = this.props.attributeParams;
        attributeParams.maxUndefined = obj.value;
        this.updateAttributeParams(attributeParams);
    }

    render(){

        const maxUndefined = [
            {value: 0, label: '0'},
            {value: 1, label: '1'},
            {value: 2, label: '2'},
            {value: 3, label: '3'},
            {value: 3, label: '4'},
            {value: 3, label: '5'},
            {value: 3, label: '6'},
            {value: 3, label: '7'},
            {value: 3, label: '8'},
            {value: 3, label: '9'},
        ];


        const popoverMaximumUndefinedCount = (
            <Popover id='maximum-undefined-count'>
                The <strong>Maximum undefined count</strong> determines how many attributes that can be present in one TEI(Tracked Entity Instance)
                and be missing in the other TEI, and still be found in the results. e.g if the maximum undefined count is 1, a TEI with the attribute 'Blood type'
                can be matched with another TEI that is missing the 'Blood type' attribute.
            </Popover>
        );

        return (
            <Col sm={6}>
                <label>
                    Maximum undefined count <OverlayTrigger trigger='click' overlay={popoverMaximumUndefinedCount}>
                        <Glyphicon className='clickable' glyph='info-sign' />
                    </OverlayTrigger>
                </label>
                <Select
                    className='m-b-sm'
                    name='max-undefined'
                    value={this.props.attributeParams.maxUndefined}
                    searchable={false}
                    clearable={false}
                    options={maxUndefined}
                    onChange={this.updateMaxUndefined}
                />
                <label>Attributes to be checked when looking for duplicates</label>
                <Select
                    name='all-attributes'
                    value={this.props.attributeParams.attributes}
                    options={this.props.attributesForSelect}
                    multi={true}
                    onChange={this.updateAllAttributes}
                />
            </Col>
        );
    }
}

export default Attributes;
