import React, { Component } from 'react';

import Select from './select';

class Tei extends Component {
    constructor(props){
        super(props);

        this.state = {
            orgUnit: '',
            program: '',
        }
    }

	render(){
		return(
			<div className='col-sm-12'>
                <Select />
			</div>
		);
	}

}

export default Tei;
