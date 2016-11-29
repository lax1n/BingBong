import React, { Component } from 'react';
import '../../styles/components/shared/duplicates.css';
import ShowDuplicates from './show_duplicates.js';
import {updateMarked} from '../../utils/reconciliation_marker'

import {includes, isEmpty} from 'lodash';
import {Row, Col, Well, Table, Checkbox, Button} from 'react-bootstrap';

const teiTableAttributes = [
    'First name',
    'Last name',
    'Date of birth',
];

const teiDetailTableAttributes = [
	'Instance',
	'First name',
	'Last name',
	'Date of birth',
	'Mother maiden name',
	'Gender',
	'Occupation',
	'Blood type',
];

const singletonTableAttributes = [
    'Attributes'
];

let singletonDetailTableAttributes = [];

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
        this.findAttributeNames = this.findAttributeNames.bind(this);
    }

    viewDuplicates(duplicates){
        if(this.props.type === 'singletons'){
            singletonDetailTableAttributes = this.findAttributeNames(duplicates, true);
        }

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

    // Helper for singletons
    findAttributeNames(singletons, includeEvent = false){
        // Only need to target the first because duplicates must have the same attributes
        const singleton = singletons[0];
        const dataValues = singleton.dataValues;

        let attributeNames = [];
        if(includeEvent)
            attributeNames.push('event');
        let attributeValues = [];
        dataValues.forEach((dataValue) => {
            attributeValues.push(dataValue.value);
        });
        for(let attribute in singleton){
            if(includes(attributeValues, singleton[attribute])){
                attributeNames.push(attribute);
            }
        }

        return attributeNames;
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
        // Prepare marked duplicates to be saved
        let duplicates = this.props.duplicates;
        let markedDuplicates = [];
        duplicates.forEach((duplicateRow) => {
            let markedRow = duplicateRow.filter((duplicate) => {
                return duplicate.reconcile;
            });

            // Must be more than 1 because to reconcile duplicates more than 1 must be found or it wouldnt be a duplicate
            if(markedRow.length > 1){
                markedDuplicates.push(markedRow);
            }
        });

        console.log('Save marked duplicates', markedDuplicates);
		updateMarked(markedDuplicates, "tei");
		console.log("Done pushing to server");
    }
	render(){
        let duplicates = this.props.duplicates;
        if(isEmpty(duplicates)){
            return (
                <div className='row'>
                    <div className='col-sm-12'>
                        <p>No duplicates found.</p>
                    </div>
                </div>
            )
        }

        let tableAttributes = [];
        let tableAttributesForShow = [];
        if(this.props.type === 'teis'){
            tableAttributes = teiTableAttributes;
            tableAttributesForShow = teiDetailTableAttributes;
        }else if(this.props.type === 'singletons'){
            tableAttributes = singletonTableAttributes;
            tableAttributesForShow = singletonDetailTableAttributes;
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
                                                if(this.props.type === 'singletons' && attribute === 'Attributes'){
                                                    return (
                                                        <td key={j}>{this.findAttributeNames(duplicateRow).join(', ')}</td>
                                                    );
                                                }
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
                            tableAttributes={tableAttributesForShow}
                            duplicates={this.state.currentDetails}
                            active={this.state.showDetails}
                            closeDetails={this.closeDetails}
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
						{/*<Button
                            bsStyle='info'
                            onClick={this.reconcileMarkedDuplicates.bind(this)}
                        >
                            Reconcile marked duplicates
                        </Button>*/}
                    </Col>
                </Row>
            </Well>
		);
	}

}

export default Duplicates;
