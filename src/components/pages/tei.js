import React, { Component } from 'react';

import {
    findTEIDuplicatesByOrganizationAndProgram,
    findTEIDuplicatesByOrganization,
} from '../../utils/tei_dup_finder';

import {Well, Row, Col, Button} from 'react-bootstrap';

import QueryArea from '../query/query_area';
import Duplicates from '../shared/duplicates';

class Tei extends Component {
    constructor(props){
        super(props);

        this.state = {
            resultsFound: false,
            results: [],
            favourites: [],
            recents: [],
			myFilters: {
				looseTestParams: ["First name", "Last name", "Date of birth", "Mothers maiden name"],
				strictTestParams: ["Blood type", "Gender"],
				timeTestParams: [],
				maxEditDistance: 2,
				maxUndefinedCount: 0,
			}
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

    findResults(params, favourite){
        if(favourite){
            this.saveFavourite(params);
        }
        this.saveRecent(params);

        // Handle what to do depending on which params were recevied
        console.log('params: '+ params.orgUnit);
        if(params.program === '' || params.program === undefined){
            findTEIDuplicatesByOrganization(params.orgUnit, this.state.myFilters).then((duplicates) => {
                console.log(duplicates);
                this.setState({resultsFound: true, results: duplicates});
            });
        }else if(params.program !== '' && params.startDate === ''){
            findTEIDuplicatesByOrganizationAndProgram(params.orgUnit, params.program, this.state.myFilters).then((duplicates) => {
                console.log(duplicates);
                this.setState({resultsFound: true, results: duplicates});
            });
        }
    }

	render(){
        let results = '';
        if(this.state.resultsFound){
            results = (
                <Duplicates duplicates={this.state.results} />
            );
        }
		return(
			<Col sm={12}>
                <QueryArea
                    title={'Tracked Entity Instances'}
                    findResults={this.findResults}
                    type={'teis'}
                    recents={this.state.recents}
                    favourites={this.state.favourites}
                />
				{results}
			</Col>
		);
	}

}

export default Tei;
