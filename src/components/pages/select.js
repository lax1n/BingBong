import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {isEmpty} from 'lodash';

import {getAllOrganizations} from '../../actions/org_actions';

class Select extends Component {
    constructor (props){
        super(props);

        this.state = {
            orgUnit: 1,
            orgUnitSelected: false,
            orgUnits: [],
        }

        this.renderSelect = this.renderSelect.bind(this);
    }

    componentDidMount(){
        getAllOrganizations().then((organizationUnits) => {
            this.setState({orgUnits: organizationUnits});
        }).catch(function (e) {
            alert(e.message);
        });
    }

    handleChangeOrgUnit(event, index, value){
        this.setState({orgUnit: value, orgUnitSelected: true});
    }

    // Only supports data containing ids & displayName (e.g orgUnits & programs)
    renderSelect(title, identifier, data){
        return (
            <SelectField
                floatingLabelText={title}
                value={eval(`this.state.${identifier}`)}
                onChange={(value) => this.setState({[identifier]: value})}
                autoWidth={true}
            >
                {data.map((element, i) => {
                    return (
                        <MenuItem value={element.id} primaryText={element.displayName} key={i} />
                    );
                })}
            </SelectField>
        );
    }

    render() {
        let programmeSelect = '';
        if(isEmpty(this.state.orgUnits)){
            return (
                <div>
                    <p>Loading organization units...</p>
                </div>
            );
        }

        if(this.state.orgUnitSelected){
            programmeSelect = this.renderSelect('Select Programme', 'orgUnit', this.state.orgUnits);
        }
        return (
            <MuiThemeProvider>
                <div>
                    {this.renderSelect('Select Organization(Clinic)', 'orgUnit', this.state.orgUnits)}
                    {programmeSelect}
                </div>
            </MuiThemeProvider>
        );
    }
}

export default Select;
