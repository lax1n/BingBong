import React, { Component } from 'react';
import {Glyphicon, Button, ButtonGroup, SplitButton, MenuItem} from 'react-bootstrap';
import {saveThings} from '../../actions/save_things.js';

class Buttons extends Component {

    render(){
        let advancedState = 'plus-sign';
        if(this.props.advancedActive)
            advancedState = 'minus-sign';

        let recentState = 'plus-sign';
        if(this.props.recentsActive)
            recentState = 'minus-sign';

        let favouriteState = 'plus-sign';
        if(this.props.favouritesActive)
            favouriteState = 'minus-sign';

        // Advanced only available for TEIs so far
        let advancedBtn = '';
        if(this.props.type === 'teis'){
            advancedBtn = (
                <Button
                    className='m-l-md'
                    bsStyle='info'
                    onClick={this.props.toggleAdvanced}
                >
                    <Glyphicon glyph={advancedState} /> Advanced
                </Button>
            );
        }

        return (
            <ButtonGroup className='border-radius-4'>
                <SplitButton
                    className='split-right-radius-4'
                    title='Find results'
                    id='find-results-split-button'
                    bsStyle='primary'
                    onClick={this.props.findResults.bind(this, false)}
                >
                    <MenuItem
                        eventKey='1'
                        onClick={this.props.findResults.bind(this, true)}
                    >
                        Find and add query to favorites
                    </MenuItem>
                </SplitButton>
                {advancedBtn}
                <Button className='m-l-md'
                    bsStyle='default'
                    onClick={this.props.toggleRecents}
                >
                    <Glyphicon glyph={recentState} /> Recent Queries
                </Button>
                <Button className='m-l-md'
                    bsStyle='default'
                    onClick={this.props.toggleFavourites}
                >
                    <Glyphicon glyph={favouriteState} /> Favourite Queries
                </Button>
            </ButtonGroup>
        );
    }
}

export default Buttons;
