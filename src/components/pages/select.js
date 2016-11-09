import React, { Component } from 'react';
import {isEmpty} from 'lodash';

import {DropdownButton, MenuItem, Button, Col} from 'react-bootstrap'
import '../../libs/bootstrap.min.css';
import '../../styles/select.css';

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
        let identifierName = identifier + 'Name';
        let identifierSelected = identifier + 'Selected';
        this.setState({[identifier]: value, [identifierName]: name, [identifierSelected]: true})
        if(identifier === 'orgUnit'){
            this.setState({programSelected: false})
            this.loadPrograms();
            this.loadTEIs();
        }
        else if(identifier === 'program')
            console.log('Ready to find results with orgUnit: ' + this.state.orgUnit + ' and program: ' + this.state.program);
    }

    // Only supports data containing ids & displayName (e.g orgUnits & programs)
    renderSelect(title, identifier, data){
        let currentTitle = '';
        if(eval(`this.state.${identifier}Selected`)){
            console.log('YELLING');
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
                id={`${identifier}-dropdown`}
                className='scrollable-menu'
                onSelect={(event) => {
                    this.handleChangeSelect(identifier, event.id, event.displayName);
                }}
            >
                {data.map((element, i) => {
                    return (
                        <MenuItem eventKey={element} key={i}>{element.displayName}</MenuItem>
                    );
                })}
            </DropdownButton>
        );
    }


    render() {
        let programSelect = '';
        if(isEmpty(this.state.orgUnits)){
            return (
                <div className='row'>
                    <p>Loading organization units...</p>
                </div>
            );
        }

        if(!(isEmpty(this.state.programs))){
            programSelect = this.renderSelect('Select Program', 'program', this.state.programs);
        }

        let teis = '';
        if(!(isEmpty(this.state.teis))){
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
        let resultBtn = '';
        if(!(isEmpty(this.state.programs))){
            resultBtn = <Button bsStyle='success'>Find Results</Button>;
        }

        return (
            <div>
                <Col md={3} className='clinicDropdown' >
                    {this.renderSelect('Select Organization(Clinic) ', 'orgUnit', this.state.orgUnits)}
                </Col>
                <Col md={3} className='progDropdown' >
                    {programSelect}
                </Col>
                <Col md={3} className='dateDropdown' >
                </Col>
                <Col md={3} className='resBtn' >
                    {resultBtn}
                </Col>
            </div>
        );
    }
}

export default Select;
