import React, { Component } from 'react';
import {Row, Panel} from 'react-bootstrap';

import Typos from './advanced/typos';
import Attributes from './advanced/attributes';

class Advanced extends Component {
    constructor(props){
        super(props);

        this.updateAdvancedParams = this.updateAdvancedParams.bind(this);
        this.generateAttributesForSelect = this.generateAttributesForSelect.bind(this);
    }

    updateAdvancedParams(category, params){
        let advancedParams = this.props.advancedParams;
        if(category === 'typos'){
            advancedParams.typos = params;
        }else if(category === 'attributes'){
            advancedParams.attributes = params;
        }

        this.props.updateAdvancedParams(advancedParams);
    }

    generateAttributesForSelect(attributes){
        let attributesForSelect = [];
        attributes.forEach((attribute) => {
            attributesForSelect.push({label: attribute, value: attribute});
        });

        return attributesForSelect
    }

    render(){
        return (
            <Panel collapsible expanded={this.props.advancedActive}>
                <Row className='text-left'>
                    <Attributes
                        attributesForSelect={this.generateAttributesForSelect(this.props.advancedParams.attributes.allAttributes)}
                        attributeParams={this.props.advancedParams.attributes}
                        updateAdvancedParams={this.updateAdvancedParams}
                    />
                    <Typos
                        attributesForSelect={this.generateAttributesForSelect(this.props.advancedParams.attributes.attributes)}
                        typoParams={this.props.advancedParams.typos}
                        updateAdvancedParams={this.updateAdvancedParams}
                    />
                </Row>
            </Panel>
        );
    }
}

export default Advanced;
