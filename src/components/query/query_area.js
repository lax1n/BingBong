import React, { Component } from 'react';
import {includes} from 'lodash';

import {Well, Row, Col, Button} from 'react-bootstrap';

import QuerySelect from './query_select';
import Instructions from '../shared/instructions';

import Buttons from './buttons';
import Advanced from './advanced';
import PreviousQueries from './previous_queries';


const defaultQueryParams = {};
let queryParams = defaultQueryParams;

const defaultAdvancedParams = {
    typos: {
        typos: true,
        maxEditDistance: 1,
        looseAttributes: ["First name", "Last name", "Mother maiden name"],
    },
    attributes: {
        allAttributes: ['First name', 'Last name', 'Date of birth', 'Mother maiden name',
                        'Address', 'Residence location', 'Occupation', 'Gender', 'Blood type',
                        'TB identifier', 'City', 'State', 'Zip code', 'Email', 'Phone number', 'National identifier',
                        'Company', 'TB number', 'Vehicle', 'Weight in kg', 'Height in cm', 'Latitude', 'Longitude'
        ],
        attributes: ["First name", "Last name", "Mother maiden name", "Date of birth", "Blood type", "Gender"],
        maxUndefined: 2,
    },
};

class QueryArea extends Component {
    constructor(props){
        super(props);

        this.state = {
            advanced: false,
            recents: false,
            favourites: false,
            error: '',
            advancedParams: defaultAdvancedParams,
        }

        this.toggleAdvanced = this.toggleAdvanced.bind(this);
        this.toggleRecents = this.toggleRecents.bind(this);
        this.toggleFavourites = this.toggleFavourites.bind(this);
        this.updateQueryParams = this.updateQueryParams.bind(this);
        this.updateAdvancedParams = this.updateAdvancedParams.bind(this);
        this.findResults = this.findResults.bind(this);
        this.showError = this.showError.bind(this);
        this.renderDeveloperShortcuts = this.renderDeveloperShortcuts.bind(this);
    }

    toggleAdvanced(){
        this.setState({advanced: !this.state.advanced});
    }

    toggleRecents(){
        this.setState({recents: !this.state.recents});
    }

    toggleFavourites(){
        this.setState({favourites: !this.state.favourites});
    }

    // Do not update state here, itll cause an infinite loop :(
    updateQueryParams(params){
        queryParams = params;
    }

    updateAdvancedParams(params){
        // Make sure loose attributes is updated accordingly
        const attributes = params.attributes.attributes;
        let looseAttributes = params.typos.looseAttributes;
        looseAttributes = looseAttributes.filter((attribute) => {
            return (includes(attributes, attribute));
        });
        params.typos.looseAttributes = looseAttributes;
        this.setState({advancedParams: params});
    }

    showError(message){
        // Perhaps make the select field red too?

        this.setState({error: message});
    }

    findResults(favourite){
        // Check if valid
        if(queryParams.orgUnit === null || queryParams.orgUnit === ''){
            this.showError('Organization(Clinic) has not been selected!');
            return;
        }else{
            this.setState({error: ''});
        }

        // Prepare params for query
        let params = queryParams;
        params.advanced = this.state.advancedParams;

        // Prepare strict params (params not in loose params)
        let selectedAttributes = params.advanced.attributes.attributes;
        let strictAttributes = [];
        selectedAttributes.forEach((attribute) => {
            if(!(includes(params.advanced.typos.looseAttributes, attribute))){
                strictAttributes.push(attribute);
            }
        });
        params.advanced.strictAttributes = strictAttributes;
        this.props.findResults(params, favourite);
    }

    renderDeveloperShortcuts(){
        return (
            <Row>
                <Button
                    bsStyle='default'
                    onClick={this.props.findResults.bind(this, {
                        orgUnit: 'DiszpKrYNg8',
                        program: 'q04UBOqq3rp',
                        startDate: '',
                        endDate: '',
                    }, false)}
                > Developer shortcut to see results for Ngelehun CHC > Information Campaign program duplicates
                </Button>
                <Button
                    bsStyle='default'
                    onClick={this.props.findResults.bind(this, {
                        orgUnit: 'DiszpKrYNg8',
                        startDate: '',
                        endDate: '',
                    }, false)}
                > Developer shortcut to see results for Ngelehun CHC
                </Button>
            </Row>
        );
    }

	render(){
        let error = '';
        if(this.state.error !== ''){
            error = (
                <div className='has-error text-center'>
                    <span className='help-block'>{this.state.error}</span>
                </div>
            );
        }

        // Advanced only available for TEIs so far
        let advanced = <hr />;
        if(this.props.type === 'teis'){
            advanced = (
                <Advanced
                    advancedParams={this.state.advancedParams}
                    updateAdvancedParams={this.updateAdvancedParams}
                    advancedActive={this.state.advanced}
                />
            );
        }

		return(
			<Row>
                <Col sm={12}>
    	            <h3 className='text-center m-b-md'>Find Duplicates in {this.props.title}</h3>
                    <Well>
                        <Row className='m-b-l'>
                            <Col sm={12}>
                                <Instructions />
                            </Col>
                        </Row>
                        <Row>
                            <QuerySelect
                                updateQueryParams={this.updateQueryParams}
                            />
                        </Row>
                        <Row>
                            <Col sm={12} className='p-t-l'>
                                {advanced}
                            </Col>
                        </Row>
                        <Row className='text-center'>
                            <Col sm={12}>
                                {error}
                                <Buttons
                                    {...this.props}
                                    findResults={this.findResults}
                                    toggleAdvanced={this.toggleAdvanced}
                                    advancedActive={this.state.advanced}
                                    recentsActive={this.state.recents}
                                    toggleRecents={this.toggleRecents}
                                    favouritesActive={this.state.favourites}
                                    toggleFavourites={this.toggleFavourites}
                                />
                            </Col>
                        </Row>
                        <Row className='text-center'>
                            <PreviousQueries
                                {...this.props}
                                recentsActive={this.state.recents}
                                favouritesActive={this.state.favourites}
                            />
                        </Row>
                    </Well>
                    {this.renderDeveloperShortcuts()}
                </Col>
			</Row>
		);
	}

}

export default QueryArea;
