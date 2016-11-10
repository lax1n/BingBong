import React, { Component } from 'react';

import {findTEIDuplicatesByOrganizationAndProgram} from '../../utils/find_duplicates';

import Select from './select';
import Duplicates from '../shared/duplicates';
import Instructions from '../shared/instructions';

class Tei extends Component {
    constructor(props){
        super(props);

        this.state = {
            resultsFound: false,
            results: [],
        }

        this.findResults = this.findResults.bind(this);
    }

    findResults(params){
        // Handle what to do depending on which params were recevied
        console.log(params);
        findTEIDuplicatesByOrganizationAndProgram(params.orgUnit, params.program).then((duplicates) => {
            console.log(duplicates);
            this.setState({resultsFound: true, results: duplicates});
        });
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
                <h3 className='text-center'>Find Duplicates in tracked entity instances</h3>
                <div className='well'>
                    <Instructions />
                    <Select findResults={this.findResults} />
                </div>
                <div className='row'>
                    <button
                        className='btn btn-default'
                        onClick={this.findResults.bind(this, {
                            orgUnit: 'DiszpKrYNg8',
                            program: 'ur1Edk5Oe2n',
                        })}
                    > Developer shortcut to see results for Ngelehun CHC > TB program duplicates
                    </button>
                </div>
                {results}
			</div>
		);
	}

}

export default Tei;
