import React, { Component } from 'react';

import Select from './select';
import Instructions from '../shared/instructions';
import SelectPrevious from '../shared/select_previous.js';

class Singleton extends Component {

	render(){
		return(
			<div className='col-sm-12'>
	            <h3 className='text-center'>Find Duplicates in singleton events</h3>
	            <div className='well'>
	                <Instructions />
	                <Select />
	            </div>
	           	<SelectPrevious />
			</div>
		);
	}

}

export default Singleton;
