import React, { Component } from 'react';
import {Button, ButtonGroup, Row, Col, Collapse, Panel} from 'react-bootstrap';


class PreviousQueries extends Component{
	constructor(props){
		super(props);

		this.renderQueries = this.renderQueries.bind(this);
	}

	renderQueries(queries){
		return (
			<Panel>
				<span>Query table coming here</span>
			</Panel>
		);
	}

	render(){
		return(
			<Col sm={12} className='p-t-md'>
				<Collapse in={this.props.recentActive}>
					{this.renderQueries()}
				</Collapse>
				<Collapse in={this.props.favouritesActive}>
					{this.renderQueries()}
				</Collapse>
			</Col>
		);
	}
}

export default PreviousQueries;
