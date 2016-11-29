import React, { Component } from 'react';
import '../../styles/components/shared/duplicates.css';
import ShowDuplicates from './show_duplicates.js';

import {isEmpty} from 'lodash';
import {Row, Col, Well, Table, Checkbox, Button} from 'react-bootstrap';

class Duplicates extends Component {
    constructor(props){
        super(props);

        this.state = {
            currentDetails: [],
            showDetails: false,
        }

        this.closeDetails = this.closeDetails.bind(this);
        this.toggleReconcile = this.toggleReconcile.bind(this);
        this.findReconciliationCount = this.findReconciliationCount.bind(this);
        this.isMarkedForReconciliation = this.isMarkedForReconciliation.bind(this);
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
        console.log('quaky');
    }

    toggleReconcile(e, duplicateRow){
        e.stopPropagation();
        const newValue = e.target.checked;
        duplicateRow.forEach((duplicate) => {
            duplicate.reconcile = newValue;
        });

        // Force update
        this.setState({});
    }

    isMarkedForReconciliation(duplicateRow){
        return this.findReconciliationCount(duplicateRow) > 0;
    }

    findReconciliationCount(duplicateRow){
        let count = 0;
        duplicateRow.forEach((duplicate) => {
            if(duplicate.reconcile)
                count++;
        });
        return count;
    }

    saveMarkedDuplicates(){
        let duplicates = this.props.duplicates;
        let markedDuplicates = duplicates.filter((duplicate) => {
            // Add functionality
        });
        console.log(this.props.duplicates);
    }

	render(){
        let duplicates = this.props.duplicates;

        const tableAttributes = this.props.tableAttributes || [
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
                <Row>
                    <Col sm={12}>
                        <h4>Duplicates (click on a row to expand)</h4>
                        <Table striped condensed
                            className='hover-info'>
                            <thead className='center'>
                                <tr>
                                    <th>Reconcile</th>
                                    <th>Marked for reconciliation</th>
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
                                            onClick={() => this.viewDuplicates(duplicateRow)}
                                        >
                                            <td>
                                                <Checkbox
                                                    checked={this.isMarkedForReconciliation(duplicateRow)}
                                                    onClick={(e) => this.toggleReconcile(e, duplicateRow)}
                                                />
                                            </td>
                                            <td>
                                                {this.findReconciliationCount(duplicateRow) + '/' + duplicateRow.length}
                                            </td>
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
                        <ShowDuplicates
                            duplicates={this.state.currentDetails}
                            show_state={this.state.showDetails}
                            closeDetails={this.closeDetails}
                            tableAttributes={this.props.detailTableAttributes}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col sm={12}>
                        <Button
                            bsStyle='primary'
                            onClick={this.saveMarkedDuplicates.bind(this)}
                        >
                            Save marked duplicates for reconciliation
                        </Button>
                    </Col>
                </Row>
            </Well>
		);
	}

}

export default Duplicates;
