import React, { Component } from 'react';
import {Table, Row, Col, Collapse, Panel} from 'react-bootstrap';
import {isEmpty} from 'lodash';

class PreviousQueries extends Component{
	constructor(props){
		super(props);

		this.renderQueries = this.renderQueries.bind(this);
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
				'orgUnit',
				'program',
				'startDate',
				'endDate',
		];
		return (
			<Panel>
				<Table striped condensed className='hover-info'>
					<thead className='center'>
						<tr>
							<th>OrgUnit</th>
							<th>Program</th>
							<th>Start Date</th>
							<th>End Date</th>
						</tr>
					</thead>
					<tbody>
						{queries.map((entryRow, i) => {
							return(
							<tr key={i} onClick={() => this.props.findResults(entryRow)} >
								{tableAttributes.map((attribute,j) => {
									return(
										<td key={j}>{entryRow[attribute]}</td>);
								})}
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
