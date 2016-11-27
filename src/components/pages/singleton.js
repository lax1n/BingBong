import React, { Component } from 'react';

import {
    findSingletonDuplicatesByOrganizationAndProgram,
    findSingletonDuplicatesByOrganization,
} from '../../utils/singleton_dup_finder';

import {Well, Row, Col, Button} from 'react-bootstrap';

import QueryArea from '../query/query_area';
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
                <QueryArea
                    title={'Singletons'}
                    findResults={this.findResults}
                    type={'singletons'}
                    recents={this.state.recents}
                    favourites={this.state.favourites}
                />
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
