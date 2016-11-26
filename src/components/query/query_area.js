import React, { Component } from 'react';

import {
    findSingletonDuplicatesByOrganizationAndProgram,
    findSingletonDuplicatesByOrganization,
} from '../../utils/singleton_dup_finder';

import {Well, Row, Col, Button, ButtonGroup,} from 'react-bootstrap';

import Select from '../pages/select';
import Instructions from '../shared/instructions';
import SelectPrevious from '../shared/select_previous.js';
import Duplicates from '../shared/duplicates';

import Buttons from './buttons';
import Advanced from './advanced';


class QueryArea extends Component {
    constructor(props){
        super(props);

        this.state = {
            advanced: false,
        }

        this.toggleAdvanced = this.toggleAdvanced.bind(this);
        this.renderDeveloperShortcuts = this.renderDeveloperShortcuts.bind(this);
    }

    toggleAdvanced(){
        this.setState({advanced: !this.state.advanced});
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
        let advanced = '';
        if(this.state.advanced){
            advanced = <Advanced />;
        }

		return(
			<Row>
                <Col sm={12}>
    	            <h3 className='text-center m-b-md'>Find Duplicates in {this.props.title}</h3>
                    <Well>
                        <Row className='m-b-l'>
                            <Col sm={12}>
                                <Instructions />
                            </Col>
                        </Row>
                        <Row>
                            <Select findResults={this.findResults} saveFavourite={this.saveFavourite} saveRecent={this.saveRecent} />
                        </Row>
                        <Row>
                            <Col sm={12}>
                                <hr />
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={12}>
                                {advanced}
                                <Buttons toggleAdvanced={this.toggleAdvanced} />
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
