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
            selected: 1,
            orgUnits: [],
        }
    }

    componentDidMount(){
        getAllOrganizations().then((organizationUnits) => {
            this.setState({orgUnits: organizationUnits});
        }).catch(function (e) {
            alert(e.message);
        });
    }

    handleChange(event, index, value){
        this.setState({selected: value});
    }

    render() {
        if(isEmpty(this.state.orgUnits)){
            return (
                <div>
                    <p>Loading organization units...</p>
                </div>
            );
        }
        return (
            <MuiThemeProvider>
                <SelectField
                    floatingLabelText="Select Organization(Clinic)"
                    value={this.state.selected}
                    onChange={this.handleChange.bind(this)}
                    autoWidth={true}
                >
                    {this.state.orgUnits.map((orgUnit, i) => {
                        return (
                            <MenuItem value={orgUnit.id} primaryText={orgUnit.displayName} key={i} />
                        );
                    })}
                </SelectField>
            </MuiThemeProvider>
        );
    }
}

export default Select;
