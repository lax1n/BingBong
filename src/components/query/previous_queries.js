import React, { Component } from 'react';
import {Table, Row, Col, Collapse, Panel, Button} from 'react-bootstrap';
import {isEmpty} from 'lodash';

class PreviousQueries extends Component{
	constructor(props){
		super(props);

		this.renderQueries = this.renderQueries.bind(this);
		this.search = this.search.bind(this);
	}

	search(e, params){
		e.stopPropagation();
		this.props.findResults(params);
	}

	renderQueries(queries){
		if(isEmpty(queries)){
			return (
				<Panel>
					<Row>
						<Col sm={12}>
							<span>¯\_(ツ)_/¯</span>
						</Col>
						<Col sm={12}>
							<span>No queries here yet.</span>
						</Col>
					</Row>
				</Panel>
			);
		}

		const tableAttributes=[
				'orgUnitName',
				'programName',
				'startDate',
				'endDate',
		];

		return (
			<Panel>
				<Table striped condensed className='hover-info'>
					<thead className='center'>
						<tr>
							<th>Organization(Clinic)</th>
							<th>Program</th>
							<th>Start Date</th>
							<th>End Date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{queries.map((entryRow, i) => {
							return(
							<tr key={i}>
								{tableAttributes.map((attribute,j) => {
									return(
										<td key={j}>{entryRow[attribute]}</td>);
								})}
								<td>
									<Button
										onClick={(e) => {this.search(e, entryRow)}}
										bsStyle='info'
									>
										Search
									</Button>
								</td>
							</tr>);})
						}
					</tbody>
				</Table>
			</Panel>
		);
	}

	render(){
		return(
			<Col sm={12} className='p-t-md'>
				<Collapse in={this.props.recentsActive}>
					{this.renderQueries(this.props.recents)}
				</Collapse>
				<Collapse in={this.props.favouritesActive}>
					{this.renderQueries(this.props.favourites)}
				</Collapse>
			</Col>
		);
	}
}

export default PreviousQueries;
