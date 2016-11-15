import React, { Component } from 'react';
import {Modal, Button, Checkbox, Table} from 'react-bootstrap';

class ShowDuplicates extends Component{

	constructor(props){
		super(props);
	}

	render(){
		const duplicates= this.props.duplicates;
		const show_state = this.props.show_state;
		const closeDetails = this.props.closeDetails;
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
                <Modal bsSize='large' show={show_state} onHide={closeDetails}>
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
                        <Button onClick={closeDetails}>Close</Button>
                        <Button bsStyle="primary">Mark for Reconciliation</Button>
                    </Modal.Footer>

                </Modal>
            </div>
        );
    }

}

export default ShowDuplicates;