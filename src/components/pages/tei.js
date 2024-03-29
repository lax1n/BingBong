import React, { Component } from 'react';
import {isEqual} from 'lodash';

import {
    findTEIDuplicatesByOrganizationAndProgram,
    findTEIDuplicatesByOrganization,
} from '../../utils/tei_dup_finder';

import {Col} from 'react-bootstrap';
import {saveThings, getThings} from '../../actions/save_things.js';

import QueryArea from '../query/query_area';
import Duplicates from '../shared/duplicates';

/*The class for the entire TEI-tab*/
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
				endDate: "",
				startDate: "",
			}
        }

        this.findResults = this.findResults.bind(this);
        this.saveFavourite = this.saveFavourite.bind(this);
        this.saveRecent = this.saveRecent.bind(this);
    }

    componentDidMount(){
        getThings("tei_favs").then((favs) => {
            getThings("tei_recents").then((recents) => {
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
        saveThings("tei_favs",favourites);
    }

    saveRecent(params){
        let recents = this.state.recents;
        recents.push(params);
        this.setState({recents: recents});
        saveThings("tei_recents",recents);
    }

    findResults(params, favourite){
		if(params.myFilters === undefined){
			params.myFilters = this.state.myFilters;
			if(params.advanced){
				if(params.advanced.typos.typos){
					params.myFilters.looseTestParams = params.advanced.typos.looseAttributes;
				}
				else{
					params.myFilters.looseTestParams = [];
				}
				params.myFilters.maxEditDistance = params.advanced.typos.maxEditDistance;
				params.myFilters.strictTestParams = params.advanced.strictAttributes;

				params.myFilters.startDate = params.startDate;
				params.myFilters.endDate = params.endDate;
				params.myFilters.maxUndefinedCount = params.advanced.attributes.maxUndefined;
			}
		}

		if(favourite){
            this.saveFavourite(params);
        }
        this.saveRecent(params);
        // Handle what to do depending on which params were recevied
        if(params.program === '' || params.program === undefined){
            findTEIDuplicatesByOrganization(params.orgUnit, params.myFilters).then((duplicates) => {
                this.setState({resultsFound: true, results: duplicates});
            });
        }else if(params.program !== '' && params.startDate === ''){
            findTEIDuplicatesByOrganizationAndProgram(params.orgUnit, params.program, params.myFilters).then((duplicates) => {
                this.setState({resultsFound: true, results: duplicates});
            });
        }
    }

	render(){
        let results = '';
        if(this.state.resultsFound){
            results = (
                <Duplicates
                    type={'teis'}
                    duplicates={this.state.results}
                />
            );
        }
		return(
			<Col sm={12} className='text-center'>
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
