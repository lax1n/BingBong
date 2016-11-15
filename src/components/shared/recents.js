import React, { Component } from 'react';
import {Well, Button} from 'react-bootstrap';

class Recents extends Component{
	constructor(props){
		super(props);
	}

	render(){
		return(
			<div>
				<Well>
					<Button bsStyle='primary' >
						Show Recent Queries
					</Button>
				</Well>
			</div>
		);
	}
}

export default Recents;