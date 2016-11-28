import React, { Component } from 'react';
import {Glyphicon, Col, Checkbox, OverlayTrigger, Popover} from 'react-bootstrap';

import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Typos extends Component {
    constructor(props){
        super(props);

        this.updateLooseParams = this.updateLooseParams.bind(this);
        this.updateMaxEditDistance = this.updateMaxEditDistance.bind(this);
        this.updateTypoParams = this.updateTypoParams.bind(this);
    }

    updateTypoParams(params){
        this.props.updateAdvancedParams('typos', params);
    }

    updateLooseParams(obj){
        let typoParams = this.props.typoParams;
        let looseParams = [];
        obj.forEach((element) => {
            looseParams.push(element.value)
        });

        typoParams.looseParams = looseParams;
        this.updateTypoParams(typoParams);
    }

    updateMaxEditDistance(obj){
        let typoParams = this.props.typoParams;
        typoParams.maxEditDistance = obj.value;
        this.updateTypoParams(typoParams);
    }

    toggleTypos(){
        let typoParams = this.props.typoParams;
        typoParams.typos = !typoParams.typos;
        this.updateTypoParams(typoParams);
    }

    render(){
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

        console.log(this.props);
        console.log(this.props.typoParams);

        return (
            <Col sm={6}>
                <Col sm={12} className='p-0'>
                    <label>Typos <Checkbox defaultChecked={this.props.typoParams.typos} onClick={(e) => this.toggleTypos()}>Check for typos</Checkbox>
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
                    value={this.props.typoParams.maxEditDistance}
                    searchable={false}
                    clearable={false}
                    options={maxEditDistances}
                    disabled={!this.props.typoParams.typos}
                    onChange={this.updateMaxEditDistance}
                />
                <label>Check for typos in the following attributes</label>
                <Select
                    name='loose-params'
                    value={this.props.typoParams.looseParams}
                    options={this.props.attributesForSelect}
                    multi={true}
                    disabled={!this.props.typoParams.typos}
                    onChange={this.updateLooseParams}
                />
            </Col>
        );
    }
}

export default Typos;
