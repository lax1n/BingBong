import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import SelectField from 'material-ui/SelectField';
//import MenuItem from 'material-ui/MenuItem';
import {isEmpty} from 'lodash';

import {DropdownButton, MenuItem} from 'react-bootstrap'
import '../../libs/bootstrap.min.css';

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
            orgUnitName:  '',
            programName: '',
        }

        this.renderSelect = this.renderSelect.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
    }

    componentDidMount(){
        // Load organization units
        getAllOrganizations().then((organizationUnits) => {
            this.setState({orgUnits: organizationUnits, orgUnit: organizationUnits[0].id, orgUnitName: organizationUnits[0].displayName});
        }).catch((e) => {
            console.log('Error while loading organization units', e.message);
        });
    }

    loadPrograms(){
        getAllProgramsByOrganization(this.state.orgUnit).then((programs) => {
            this.setState({programs: programs, program: programs[0].id, programName: programs[0].displayName});
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

    handleChangeSelect(identifier, value, name){
        console.log('Bing handleChangeSelect()');
        let identifierName = identifier + 'Name';
        console.log("Bing identifierName: "+ identifierName);
        this.setState({[identifier]: value, [identifierName]: name})
        console.log('Bing VALUE:'+value);
        console.log("Bing this.state.${identifier}: "+eval(`this.state.${identifier}`));
        if(identifier === 'orgUnit'){
            this.loadPrograms();
            this.loadTEIs();
        }
        else if(identifier === 'program')
            console.log('Ready to find results with orgUnit: ' + this.state.orgUnit + ' and program: ' + this.state.program);
    }

    // Only supports data containing ids & displayName (e.g orgUnits & programs)
    renderSelect(title, identifier, data){
        let currentTitle = '';
        console.log('Bing renderSelect()');
        if(eval(`this.state.${identifier}`) !== ''){

            console.log("Bing eval(`this.state.${identifier}Name`): "+eval(`this.state.${identifier}Name`));
            currentTitle = eval(`this.state.${identifier}Name`);
        }else{
            currentTitle = title;
        }
        //this.handleChangeSelect(identifier, event.target.value
        //(event) => console.log('OONTZ OONTZ'+event)
        //(event) => {console.log('event: ', event)}
        return (
            <DropdownButton
                bsStyle="primary"
                title={currentTitle}
                value={eval(`this.state.${identifier}`)}
                onSelect={(event) => {
                    console.log("Bing this: "+ this);
                    this.handleChangeSelect(identifier, event.id, event.displayName);
                }}
            >
                {data.map((element, i) => {
                    return (
                        <MenuItem eventKey={element} id={i}> {element.displayName} </MenuItem>
                    );
                })}
            </DropdownButton>
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
            console.log("Bing this.state.programs: "+this.state.programs);
            programSelect = this.renderSelect('Select Program', 'program', this.state.programs);
        }

        let teis = '';
        if(!(isEmpty(this.state.teis))){
            console.log("Bing this.state.teis: "+this.state.teis);
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
            <div className="dropdown">
                {
                    this.renderSelect('Select Organization(Clinic) ','orgUnit',this.state.orgUnits)
                }
                {
                    programSelect
                }
            </div>
            /*
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
            */
        );
    }
}

export default Select;
