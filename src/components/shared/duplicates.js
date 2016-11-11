import React, { Component } from 'react';
import '../../styles/components/shared/duplicates.css';
//import showDuplicates from '../shared/show_duplicates.js';

import {isEmpty} from 'lodash';
import {Well, Table, Button, Modal, Checkbox} from 'react-bootstrap';

class Duplicates extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentDetails: [],
            showDetails: false,
        }

        this.showDuplicates = this.showDuplicates.bind(this);
        this.closeDetails = this.closeDetails.bind(this);
        this.toggleReconcile = this.toggleReconcile.bind(this);
    }

    showDuplicates(duplicates){
        const tableAttributes = [
            'Instance',
            'First name',
            'Last name',
            'Date of birth',
            'Mother maiden name',
            'Gender',
            'Occupation',
            'Blood type',
        ];
        return(
            <div>
                <Modal show={this.state.showDetails} onHide={this.closeDetails}>
                    <Modal.Header>
                        <Modal.Title>Duplicates found for</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped condensed>
                            <thead className='center'>
                                <tr>
                                    <th>Reconcile</th>
                                    {tableAttributes.map((attribute, i) => {
                                        return (
                                            <th key={i}>{attribute}</th>
                                        );
                                    })}
                                </tr>
                            </thead>
                            <tbody className='center'>
                                {duplicates.map((duplicateRow, i) => {
                                    return (
                                        <tr key={i}>
                                            <td><Checkbox /></td>
                                            {tableAttributes.map((attribute, j) => {
                                                return (
                                                    <td key={j}>{duplicateRow[attribute]}</td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeDetails}>Close</Button>
                        <Button bsStyle="primary">Mark for Reconciliation</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        );
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
                                </tr>
                            );
                        })}
                    </tbody>
                </Table>
                {this.showDuplicates(this.state.currentDetails)}
            </Well>
		);
	}

}

export default Duplicates;
