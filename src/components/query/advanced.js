import React, { Component } from 'react';
import {Glyphicon, Button, ButtonGroup, SplitButton, MenuItem, Row, Col, Checkbox, Well} from 'react-bootstrap';

import '../../styles/components/query/advanced.css';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class Advanced extends Component {
    constructor(props){
        super(props);

        this.state = {
            looseParams: ["First name", "Last name", "Mother maiden name"],
        }

        this.updateLooseParams = this.updateLooseParams.bind(this);
    }

    updateLooseParams(obj){
        let looseParams = [];
        obj.forEach((element) => {
            looseParams.push(element.value)
        });
        console.log(looseParams);
        this.setState({looseParams: looseParams});
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
        return (
            <Well>
                <Row className='text-left'>
                    <Col sm={12}>

                    </Col>
                    <Col sm={4}>
                        <Checkbox>Check for typos</Checkbox>
                        <Checkbox>Check for typos</Checkbox>
                        <Select
                            name='loose-params'
                            value={this.state.looseParams}
                            options={attributes}
                            multi={true}
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
            </Well>
        );
    }
}

export default Advanced
