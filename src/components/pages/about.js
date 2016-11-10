import React, { Component } from 'react';

class About extends Component {

	render(){
		return(
			<div className='text-center'>
				<br />
                <p>Use Tracked Entity Instances to gather duplicates of TEIs </p>
                <p>Use Singletons to gather duplicates of single events that are not associated with persons</p>
			</div>
		);
	}

}

export default About;
