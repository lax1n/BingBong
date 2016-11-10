import React, { Component } from 'react';

import Select from './select';
import Instructions from '../shared/instructions';

class Tei extends Component {
    constructor(props){
        super(props);

        this.state = {
            results: [],
        }

        this.findResults = this.findResults.bind(this);
    }

    findResults(params){
        // Handle what to do depending on which params were recevied
        console.log(params);
    }

	render(){
		return(
			<div className='col-sm-12'>
                <h3 className='text-center'>Find Duplicates in tracked entity instances</h3>
                <div className='well'>
                    <Instructions />
                    <Select findResults={this.findResults} />
                </div>
			</div>
		);
	}

}

export default Tei;
