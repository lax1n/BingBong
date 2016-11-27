import React, { Component } from 'react';

import {Well, Row, Col, Button} from 'react-bootstrap';

import QuerySelect from './query_select';
import Instructions from '../shared/instructions';

import Buttons from './buttons';
import Advanced from './advanced';
import PreviousQueries from './previous_queries';


let queryParams = {};

let advancedParams = {
    typos: {
        typos: true,
        maxEditDistance: 1,
        looseParams: ["First name", "Last name", "Mother maiden name"],
    }
};

class QueryArea extends Component {
    constructor(props){
        super(props);

        this.state = {
            advanced: false,
            recents: false,
            favourites: false,
            error: '',
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

    // Do not update state here, it'll cause an infinite loop :(
    updateQueryParams(params){
        queryParams = params;
    }

    // Do not update state here, it'll cause an infinite loop :(
    updateAdvancedParams(params){
        advancedParams = params;
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
        params.advanced = advancedParams;
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
                    advancedParams={advancedParams}
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
                        <Row>
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
                        <Row>
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
