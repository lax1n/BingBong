import React, { Component } from 'react';

import {
    findSingletonDuplicatesByOrganizationAndProgram,
    findSingletonDuplicatesByOrganization,
} from '../../utils/singleton_dup_finder';

import {Well, Row, Col, Button, ButtonGroup,} from 'react-bootstrap';

import Select from './select';
import Instructions from '../shared/instructions';
import SelectPrevious from '../shared/select_previous.js';

class Singleton extends Component {
	constructor(props){
		super(props);

		this.state = {
			favourites: [],
			recents: [],
			resultsFound: false,
			results: [],
		}

		this.findResults = this.findResults.bind(this);
        this.saveFavourite = this.saveFavourite.bind(this);
        this.saveRecent = this.saveRecent.bind(this);
	}

    saveFavourite(params){
        console.log('name: '+ params);
        this.state.favourites.push(params);
    }

    saveRecent(params){
        this.state.recents.push(params);
    }

    findResults(params){
        // Handle what to do depending on which params were recevied
        console.log('params: '+ params.orgUnit);
        if(params.program === '' || params.program === undefined){
            findSingletonDuplicatesByOrganization(params.orgUnit).then((duplicates) => {
				console.log("My duplicates:");
                console.log(duplicates);

                this.setState({resultsFound: true, results: duplicates});
            });
        }else if(params.program !== '' && params.startDate === ''){
            findSingletonDuplicatesByOrganizationAndProgram(params.orgUnit, params.program).then((duplicates) => {
				console.log("My duplicates:");
                console.log(duplicates);
                this.setState({resultsFound: true, results: duplicates});
            });
        }
    }

	render(){
		return(
			<div>
				<Row sm={12}>
	            <h3 className='text-center'>Find Duplicates in singleton events</h3>
	            <Well>
	                <Instructions />
	                <Select findResults={this.findResults} saveFavourite={this.saveFavourite} saveRecent={this.saveRecent} />
	            </Well>
	            <Row>
	                <Col sm={6}>
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
	                </Col>
	                <Col sm={6}>
						<Button
	                        bsStyle='default'
	                        onClick={this.findResults.bind(this, {
	                            orgUnit: 'DiszpKrYNg8',
	                            startDate: '',
	                            endDate: '',
	                        })}
	                    > Developer shortcut to see results for Ngelehun CHC
	                    </Button>
	                </Col>
	            </Row>
				</Row>
	           	<SelectPrevious findResults={this.findResults} saveFavourite={this.saveFavourite} saveRecent={this.saveRecent}/>
			</div>
		);
	}

}

export default Singleton;
