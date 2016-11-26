import React, { Component } from 'react';
import {Glyphicon, Button, ButtonGroup, SplitButton, MenuItem} from 'react-bootstrap';

class Buttons extends Component {

    render(){
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
                    <Glyphicon glyph='plus-sign' /> Advanced
                </Button>
                <Button className='m-l-md'
                    bsStyle='default'
                >
                    Recent Queries
                </Button>
                <Button className='m-l-md'
                    bsStyle='default'
                >
                    Favourite Queries
                </Button>
            </ButtonGroup>
        );
    }
}

export default Buttons;
