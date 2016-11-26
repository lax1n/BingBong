import React, { Component } from 'react';

import {
    findTEIDuplicatesByOrganizationAndProgram,
    findTEIDuplicatesByOrganization,
} from '../../utils/tei_dup_finder';

import Select from './select';
import QueryArea from '../query/query_area';
import Duplicates from '../shared/duplicates';
import Instructions from '../shared/instructions';
import SelectPrevious from '../shared/select_previous.js';

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
			<div className='col-sm-12'>
                <QueryArea
                    title={'Tracked Entity Instances'}
                    findResults={this.findResults}
                />
                <SelectPrevious favourites={this.state.favourites} recents={this.state.recents} findResults={this.findResults} />
                <div className='row'>
                    <button
                        className='btn btn-default'
                        onClick={this.findResults.bind(this, {
                            orgUnit: 'DiszpKrYNg8',
                            program: 'ur1Edk5Oe2n',
                            startDate: '',
                            endDate: '',
                        })}
                    > Developer shortcut to see results for Ngelehun CHC > TB program duplicates
                    </button>
					<button
                        className='btn btn-default'
                        onClick={this.findResults.bind(this, {
                            orgUnit: 'DiszpKrYNg8',
                            startDate: '',
                            endDate: '',
                        })}
                    > Developer shortcut to see results for Ngelehun CHC
                    </button>
                </div>
                {results}
			</div>
		);
	}

}

export default Tei;
