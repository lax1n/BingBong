import React, { Component } from 'react';
import {isEqual} from 'lodash';

import {
    findSingletonDuplicatesByOrganizationAndProgram,
    findSingletonDuplicatesByOrganization,
} from '../../utils/singleton_dup_finder';

import {Col} from 'react-bootstrap';
import {saveThings, getThings} from '../../actions/save_things.js';
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

    componentDidMount(){
        getThings("singleton_favs").then((favs) => {
            getThings("singleton_recents").then((recents) => {
                if(isEqual(favs, {})){
                    favs = [];
                }
                if(isEqual(recents, {})){
                    recents = [];
                }
                this.setState({recents: recents, favourites: favs});
            });
        });
    }

    saveFavourite(params){
        let favourites = this.state.favourites;
        favourites.push(params);
        this.setState({favourites: favourites});
        saveThings("singleton_favs",favourites);
    }

    saveRecent(params){
        let recents = this.state.recents;
        recents.push(params);
        this.setState({recents: recents});
        saveThings("singleton_recents",recents);
    }

    findResults(params, favourite){
		params.myFilters = this.state.myFilters;

		params.myFilters.startDate = params.startDate;
		params.myFilters.endDate = params.endDate;

        if(favourite){
            this.saveFavourite(params);
        }
        this.saveRecent(params);


        // Handle what to do depending on which params were recevied
        if(params.program === '' || params.program === undefined){
            findSingletonDuplicatesByOrganization(params.orgUnit, params.myFilters).then((duplicates) => {
                this.setState({resultsFound: true, results: duplicates});
            });
        }else if(params.program !== '' && params.startDate === ''){
            findSingletonDuplicatesByOrganizationAndProgram(params.orgUnit, params.program, params.myFilters).then((duplicates) => {
                this.setState({resultsFound: true, results: duplicates});
            });
        }

    }

	render(){
		let results = '';
		if(this.state.resultsFound){
			results = (
				<Duplicates
                    type={'singletons'}
					duplicates={this.state.results}
				/>
			);
		}
		return(
			<Col sm={12} className='text-center'>
                <QueryArea
                    title={'Singletons'}
                    findResults={this.findResults}
                    type={'singletons'}
                    recents={this.state.recents}
                    favourites={this.state.favourites}
                />
				{results}
			</Col>
		);
	}

}

export default Singleton;
