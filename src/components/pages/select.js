import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import {isEmpty} from 'lodash';

//import '../../libs/bootstrap.min.css';

import {getAllOrganizations} from '../../actions/org_actions';
import {getAllProgramsByOrganization} from '../../actions/program_actions';
import {getAllTEIsByOrganization} from '../../actions/tei_actions';

class Select extends Component {
    constructor (props){
        super(props);

        this.state = {
            orgUnit: null,
            orgUnitSelected: false,
            orgUnits: [],
            program: null,
            programSelected: false,
            programs: [],
            teis: [],
        }

        this.renderSelect = this.renderSelect.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
    }

    componentDidMount(){
        // Load organization units
        getAllOrganizations().then((organizationUnits) => {
            this.setState({orgUnits: organizationUnits, orgUnit: organizationUnits[0].id});
        }).catch((e) => {
            console.log('Error while loading organization units', e.message);
        });
    }

    loadPrograms(){
        getAllProgramsByOrganization(this.state.orgUnit).then((programs) => {
            this.setState({programs: programs, program: programs[0].id});
        }).catch((e) => {
            console.log('Error while loading programs', e.message);
        });
    }

    loadTEIs(){
        getAllTEIsByOrganization(this.state.orgUnit).then((teis) => {
            this.setState({teis: teis});
        }).catch((e) => {
            console.log('Error while loading TEIs', e.message);
        });
    }

    handleChangeSelect(identifier, value){
        this.setState({[identifier]: value})
        console.log(eval(`this.state.${identifier}`));
        if(identifier === 'orgUnit'){
            this.loadPrograms();
            this.loadTEIs();
        }
        else if(identifier === 'program')
            console.log('Ready to find results with orgUnit: ' + this.state.orgUnit + ' and program: ' + this.state.program);
    }

    // Only supports data containing ids & displayName (e.g orgUnits & programs)
    renderSelect(title, identifier, data){
        return (
            <SelectField
                floatingLabelText={title}
                value={eval(`this.state.${identifier}`)}
                onChange={(event, index, value) => this.handleChangeSelect(identifier, value)}
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
        let programSelect = '';
        if(isEmpty(this.state.orgUnits)){
            return (
                <div>
                    <p>Loading organization units...</p>
                </div>
            );
        }

        if(!(isEmpty(this.state.programs))){
            console.log(this.state.programs);
            programSelect = this.renderSelect('Select Program', 'program', this.state.programs);
        }

        let teis = '';
        if(!(isEmpty(this.state.teis))){
            console.log(this.state.teis);
            teis = (
                <div className='row'>
                    {this.state.teis.map((tei, i) => {
                        return (
                            <p key={i}>
                                {tei.trackedEntityInstance}
                            </p>
                        );
                    })}
                </div>
            )
        }

        return (
            <div className='container-fluid'>
                <div className='row'>
                    <MuiThemeProvider>
                        <div>
                            {this.renderSelect('Select Organization(Clinic)', 'orgUnit', this.state.orgUnits)}
                            {programSelect}
                        </div>
                    </MuiThemeProvider>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        {teis}
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Something</th>
                                    <th>Age</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Bing Bong</td>
                                    <td>Best friend</td>
                                    <td>11</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Select;
