import React, { Component } from 'react';
import {Glyphicon, Button, ButtonGroup, SplitButton, MenuItem} from 'react-bootstrap';

class Buttons extends Component {

    render(){
        let advancedState = 'plus-sign';
        if(this.props.advancedActive)
            advancedState = 'minus-sign';

        let recentState = 'plus-sign';
        if(this.props.recentActive)
            recentState = 'minus-sign';

        let favouriteState = 'plus-sign';
        if(this.props.favouritesActive)
            favouriteState = 'minus-sign';

        return (
            <ButtonGroup className='pull-left border-radius-4'>
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
                <Button
                    className='m-l-md'
                    bsStyle='info'
                    onClick={this.props.toggleAdvanced}
                >
                    <Glyphicon glyph={advancedState} /> Advanced
                </Button>
                <Button className='m-l-md'
                    bsStyle='default'
                    onClick={this.props.toggleRecent}
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
