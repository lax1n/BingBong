import React, { Component } from 'react';
import {Row, Panel} from 'react-bootstrap';

import Typos from './advanced/typos'

class Advanced extends Component {
    constructor(props){
        super(props);

        this.updateAdvancedParams = this.updateAdvancedParams.bind(this);
    }

    updateAdvancedParams(category, params){
        let advancedParams = this.props.advancedParams;
        if(category === 'typos'){
            advancedParams.typos = params;
        }

        this.props.updateAdvancedParams(advancedParams);
    }

    render(){
        return (
            <Panel collapsible expanded={this.props.advancedActive}>
                <Row className='text-left'>
                    <Typos
                        typoParams={this.props.advancedParams.typos}
                        updateAdvancedParams={this.updateAdvancedParams}
                    />
                </Row>
            </Panel>
        );
    }
}

export default Advanced;
