import React, { Component } from 'react';
import {Modal, Button, Checkbox, Table} from 'react-bootstrap';

class ShowDuplicates extends Component{
	constructor(props){
		super(props);

		this.toggleReconcile = this.toggleReconcile.bind(this);
	}

	toggleReconcile(e, duplicate){
		if(duplicate.reconcile){
			duplicate.reconcile = false;
		}else{
			duplicate.reconcile = true;
		}
		console.log(duplicate);
	}

	render(){
		const show_state = this.props.show_state;
		const closeDetails = this.props.closeDetails;
        const tableAttributes = this.props.tableAttributes || [
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
                                {this.props.duplicates.map((duplicate, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>
												<Checkbox
													defaultChecked={duplicate.reconcile}
													onClick={(e) => this.toggleReconcile(e, duplicate)} />
											</td>
                                            {tableAttributes.map((attribute, j) => {
                                                return (
                                                    <td key={j}>{duplicate[attribute]}</td>
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
