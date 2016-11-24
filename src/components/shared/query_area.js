import React, { Component } from 'react';

import {
    findSingletonDuplicatesByOrganizationAndProgram,
    findSingletonDuplicatesByOrganization,
} from '../../utils/singleton_dup_finder';

import {Well, Row, Col, Button, ButtonGroup,} from 'react-bootstrap';

import Select from '../pages/select';
import Instructions from './instructions';
import SelectPrevious from './select_previous.js';
import Duplicates from './duplicates';

class QueryArea extends Component {
    constructor(props){
        super(props);

        this.renderDeveloperShortcuts = this.renderDeveloperShortcuts.bind(this);
    }

    renderDeveloperShortcuts(){
        return (
            <Row>
                <Button
                    bsStyle='default'
                    onClick={this.findResults.bind(this, {
                        orgUnit: 'DiszpKrYNg8',
                        program: 'q04UBOqq3rp',
                        startDate: '',
                        endDate: '',
                    })}
                > Developer shortcut to see results for Ngelehun CHC > Information Campaign program duplicates
                </Button>
                <Button
                    bsStyle='default'
                    onClick={this.findResults.bind(this, {
                        orgUnit: 'DiszpKrYNg8',
                        startDate: '',
                        endDate: '',
                    })}
                > Developer shortcut to see results for Ngelehun CHC
                </Button>
            </Row>
        );
    }

	render(){
		return(
			<Row>
                <Col sm={12}>
    	            <h3 className='text-center'>Find Duplicates in {this.props.title}</h3>
                    <Well>
                        <Row>
                            <Col sm={12}>
                                <Instructions />
                            </Col>
                            <Col sm={12}>
                                <Select findResults={this.findResults} saveFavourite={this.saveFavourite} saveRecent={this.saveRecent} />
                            </Col>
                            <Col sm={12}>
                                <hr />
                            </Col>
                            <Col sm={12}>
                	           	<SelectPrevious findResults={this.findResults} saveFavourite={this.saveFavourite} saveRecent={this.saveRecent}/>
                            </Col>
                        </Row>
                    </Well>
                    {this.renderDeveloperShortcuts}
                </Col>
			</Row>
		);
	}

}

export default QueryArea;
