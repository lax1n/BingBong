import React, { Component } from 'react';
import '../../styles/components/shared/duplicates.css';
import ShowDuplicates from './show_duplicates.js';

import {isEmpty} from 'lodash';
import {Well, Table, Button, Modal, Checkbox} from 'react-bootstrap';

class Duplicates extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentDetails: [],
            showDetails: false,
        }

        this.closeDetails = this.closeDetails.bind(this);
        this.toggleReconcile = this.toggleReconcile.bind(this);
    }

    viewDuplicates(duplicates){
        this.setState({
            currentDetails: duplicates,
            showDetails: true,
        });
    }

    closeDetails(){
        this.setState({
            currentDetails: [],
            showDetails: false,
        });
    }

    toggleReconcile(e, duplicate){
        console.log("Checkbox clicked");
        e.stopPropagation();
    }

	render(){
        const duplicates = this.props.duplicates;

        const tableAttributes = [
            'First name',
            'Last name',
            'Date of birth',
        ];

        if(isEmpty(duplicates)){
            return (
                <div className='row'>
                    <div className='col-sm-12'>
                        <p>No duplicates found.</p>
                    </div>
                </div>
            )
        }
		return(
            <Well>
                <h4>Duplicates (click on a row to expand)</h4>
                <Table striped condensed
                    className='hover-info'>
                    <thead className='center'>
                        <tr>
                            <th>Reconcile</th>
                            {tableAttributes.map((attribute, i) => {
                                return (
                                    <th key={i}>{attribute}</th>
                                );
                            })}
                            <th>No. of duplicates</th>
                        </tr>
                    </thead>
                    <tbody>
                        {duplicates.map((duplicateRow, i) => {
                            return (
                                <tr key={i}
                                    onClick={() => this.viewDuplicates(duplicateRow)}>
                                    <td><Checkbox onClick={(e) => this.toggleReconcile(e, duplicateRow)} /></td>
                                    {tableAttributes.map((attribute, j) => {
                                        return (
                                            <td key={j}>{duplicateRow[0][attribute]}</td>
                                        );
                                    })}
                                    <td>{duplicateRow.length}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                <ShowDuplicates duplicates={this.state.currentDetails} show_state={this.state.showDetails} closeDetails={this.closeDetails} />
            </Well>
		);
	}

}

export default Duplicates;
