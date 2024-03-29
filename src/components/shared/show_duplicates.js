import React, { Component } from 'react';
import {Modal, Button, Checkbox, Table} from 'react-bootstrap';
import {capitalize} from 'lodash';

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
	}

	render(){
		const active = this.props.active;
		const closeDetails = this.props.closeDetails;

		let tableAttributes = this.props.tableAttributes;
        return(
            <div>
                <Modal bsSize='large' show={active} onHide={closeDetails}>
                    <Modal.Header>
                        <Modal.Title>Duplicates found</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Table striped condensed>
                            <thead className='center'>
                                <tr>
                                    <th>Reconcile</th>
                                    {tableAttributes.map((attribute, i) => {
                                        return (
                                            <th key={i}>{capitalize(attribute)}</th>
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
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }

}

export default ShowDuplicates;
