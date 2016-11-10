import React, { Component } from 'react';
import Modal from 'react-bootstrap';

class showDuplicates extends Component{

	render(){
		return(
			<div>
	    		<Modal.Dialog>
	      			<Modal.Header>
	        			<Modal.Title>Duplicates found for</Modal.Title>
	      			</Modal.Header>

	      			<Modal.Body>
	        			TBA
	      			</Modal.Body>

	      			<Modal.Footer>
	        			<Button>Close</Button>
	        			<Button bsStyle="primary">Mark for Reconciliation</Button>
	      			</Modal.Footer>

	    		</Modal.Dialog>
	  		</div>
  		);
	}

}

export default showDuplicates;