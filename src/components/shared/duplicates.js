import React, { Component } from 'react';
//import showDuplicates from '../shared/show_duplicates.js';

import {isEmpty} from 'lodash';
import {Well, Table, Button, Modal} from 'react-bootstrap';

class Duplicates extends Component {
    constructor(props){
        super(props);
    }

    show_duplicates(){
        console.log('yo?');
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

	render(){
        const duplicates = this.props.duplicates;

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
            <div>
                <Well>
                    <Table>
                        <thead>
                            <tr>
                                <th>Duplicates found</th>
                            </tr>
                        </thead>
                        <tbody>
                            {duplicates.map((duplicateRow, i) => {
                                console.log(duplicateRow[0]);
                                return (
                                    <tr key={i}>
                                        <td><Button onClick={this.show_duplicates}>{duplicateRow[0]["First name"]}</Button></td> 
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </Well>
            </div>
            /*<div>
                <div className='well'>
                    {duplicates.map((duplicateRow, i) => {
                        return (
                            <div className='row' key={i}>
                                {duplicateRow.map((duplicate, j) => {
                                    return (
                                        <p key={j}>{duplicate["First name"]}</p>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>*/
		);
	}

}

export default Duplicates;
