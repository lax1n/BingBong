import React, { Component } from 'react';
import {Table} from 'react-bootstrap';


class ShowPrevious extends Component{

	render(){
		const queries = this.props.queries;
		const tableAttributes=[
			'orgUnitName',
			'programName',
			'startDate',
			'endDate',
		];
		if(queries==null){
			return(<p>No saved queries.</p>);
		}
		else{
			return(
				<div>
					<Table striped condensed
							className='hover-info'>
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
												<td key={j}>{entryRow[attribute]}</td>);})
										}
									</tr>);})
								}
							</tbody>
					</Table>
				</div>
			);
		}
	}

}

export default ShowPrevious;
