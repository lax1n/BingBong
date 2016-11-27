import React, { Component } from 'react';

import {
    findSingletonDuplicatesByOrganizationAndProgram,
    findSingletonDuplicatesByOrganization,
} from '../../utils/singleton_dup_finder';

import {Well, Row, Col, Button} from 'react-bootstrap';

import Select from './select';
import Instructions from '../shared/instructions';
import SelectPrevious from '../shared/select_previous.js';
import Duplicates from '../shared/duplicates';

class Singleton extends Component {
	constructor(props){
		super(props);

		this.state = {
			favourites: [],
			recents: [],
			resultsFound: false,
			results: [],
			myFilters: {
				timeTestParams: ["eventDate"],
				maxEditDistance: 2,
				maxUndefinedCount: 0,
			},
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
            findSingletonDuplicatesByOrganization(params.orgUnit, this.state.myFilters).then((duplicates) => {
				console.log("My duplicates:");
                console.log(duplicates);

                this.setState({resultsFound: true, results: duplicates});
            });
        }else if(params.program !== '' && params.startDate === ''){
            findSingletonDuplicatesByOrganizationAndProgram(params.orgUnit, params.program, this.state.myFilters).then((duplicates) => {
				console.log("My duplicates:");
                console.log(duplicates);
                this.setState({resultsFound: true, results: duplicates});
            });
        }
    }

	render(){
		let results = '';
		if(this.state.resultsFound){
			results=(
				<Duplicates duplicates={this.state.results} />
			);
		}
		return(
			<Col sm={12}>
	            <h3 className='text-center'>Find Duplicates in singleton events</h3>
	            <Well>
	                <Instructions />
	                <Select findResults={this.findResults} saveFavourite={this.saveFavourite} saveRecent={this.saveRecent} />
	            </Well>
	           	<SelectPrevious findResults={this.findResults} saveFavourite={this.saveFavourite} saveRecent={this.saveRecent}/>
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
				{results}
			</Col>
		);
	}

}

export default Singleton;
