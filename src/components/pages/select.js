import React, { Component } from 'react';
import {isEmpty} from 'lodash';
import DatePicker from 'react-bootstrap-date-picker';
//import Typeahead from 'react-bootstrap-typeahead';

import {DropdownButton, MenuItem, Button, ButtonToolbar, Col} from 'react-bootstrap'
import '../../libs/bootstrap.min.css';
import '../../styles/select.css';


import {getAllOrganizations} from '../../actions/org_actions';
import {getAllProgramsByOrganization} from '../../actions/program_actions';

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
            startDate: '',
            endDate: '',
        }

        this.renderSelect = this.renderSelect.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.changeStartDate = this.changeStartDate.bind(this);
        this.changeEndDate = this.changeEndDate.bind(this);
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

    handleChangeSelect(identifier, value, name){
        let identifierName = identifier + 'Name';
        let identifierSelected = identifier + 'Selected';
        this.setState({[identifier]: value, [identifierName]: name, [identifierSelected]: true})
        if(identifier === 'orgUnit'){
            this.setState({programSelected: false})
            this.loadPrograms();
        }
        else if(identifier === 'program')
            console.log('Ready to find results with orgUnit: ' + this.state.orgUnit + ' and program: ' + this.state.program);
    }

    changeStartDate(value){
        this.setState({startDate: value});
    }

    changeEndDate(value){
        this.setState({endDate: value});
    }

    // Only supports data containing ids & displayName (e.g orgUnits & programs)
    renderSelect(title, identifier, data){
        let currentTitle = '';
        if(eval(`this.state.${identifier}Selected`)){
            currentTitle = eval(`this.state.${identifier}Name`);
        }else{
            currentTitle = title;
        }
        return (
            <DropdownButton
                bsStyle="default"
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

    findResults(){
        const params = {
            orgUnit: this.state.orgUnit,
            program: this.state.program,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        }
        this.props.findResults(params);
    }

    render() {
        if(isEmpty(this.state.orgUnits)){
            return (
                <div className='row text-center'>
                    <p>Loading organization units...</p>
                </div>
            );
        }

        if(this.state.orgUnitSelected == false){
            return (
                <div className='row text-center'>
                    <div className='col-sm-12'>
                        {this.renderSelect('Select Organization/Clinic', 'orgUnit', this.state.orgUnits)}
                    </div>
                </div>
            );
        }

        return (
            <div className='row'>
                <div className='row'>
                    <Col sm={3} id='organizationSelect' >
                        <div className='form-group text-center'>
                            <div className='row'>
                                <label>Organization(Clinic)</label>
                            </div>
                            <div className='row'>
                                {this.renderSelect('Select Organization/Clinic', 'orgUnit', this.state.orgUnits)}
                            </div>
                        </div>
                    </Col>
                    <Col sm={3} id='programSelect'>
                        <div className='form-group text-center'>
                            <div className='row'>
                                <label>Program (Optional)</label>
                            </div>
                            <div className='row'>
                                {this.renderSelect('Select Program', 'program', this.state.programs)}
                            </div>
                        </div>
                    </Col>
                    <Col sm={6} id='dateSelect'>
                        <div className='form-group text-center'>
                            <div className='row'>
                                <label>Time frame (Optional)</label>
                            </div>
                            <div className='row'>
                                <Col sm={6} id='startDateSelect'>
                                    <DatePicker
                                        placeholder='Start date'
                                        value={this.state.startDate}
                                        onChange={this.changeStartDate} />
                                </Col>
                                <Col sm={6} id='endDateSelect'>
                                    <DatePicker
                                        placeholder='End date'
                                        value={this.state.endDate}
                                        onChange={this.changeEndDate} />
                                </Col>
                            </div>
                        </div>
                    </Col>
                </div>
                <div className='row'>
                    <Col sm={3} className='resBtn'>
                        <Button
                            bsStyle='primary'
                            onClick={this.findResults.bind(this)}
                            >Find Results</Button>
                    </Col>
                    <Col sm={7} smPush={4} className='favBtn'>
                        <Button 
                            bsStyle='info'
                            >Add to Favourites</Button>
                    </Col>
                </div>
            </div>
        );
    }
}

export default Select;
