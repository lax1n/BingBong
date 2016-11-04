import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import {getAllOrganizations} from '../../actions/org_actions';

class Select extends Component {
    constructor (props){
        super(props);

        this.state = {
            selected: 1
        }
    }
    handleChange(event, index, value){
        this.setState({selected: value});
        getAllOrganizations();
    }

    render() {
        return (
            <MuiThemeProvider>
                <SelectField
                    floatingLabelText="Frequency"
                    value={this.state.selected}
                    onChange={this.handleChange.bind(this)}
                    autoWidth={true}
                >
                    <MenuItem value={1} primaryText="Auto width" />
                    <MenuItem value={2} primaryText="Every Night" />
                    <MenuItem value={3} primaryText="Weeknights" />
                    <MenuItem value={4} primaryText="Weekends" />
                    <MenuItem value={5} primaryText="Weekly" />
                </SelectField>
            </MuiThemeProvider>
        );
    }
}

export default Select;
