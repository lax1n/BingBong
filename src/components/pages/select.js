import React, { Component } from 'react';
import {isEmpty} from 'lodash';
import DatePicker from 'react-bootstrap-date-picker';

import Typeahead from 'react-bootstrap-typeahead';

import {DropdownButton, MenuItem, Button, Row, Col} from 'react-bootstrap'
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
        this.saveRecent = this.saveRecent.bind(this);
    }

    componentDidMount(){
        // Load organization units
        getAllOrganizations().then((organizationUnits) => {
            this.setState({orgUnits: organizationUnits, orgUnit: '', orgUnitName: ''});
        }).catch((e) => {
            console.log('Error while loading organization units', e.message);
        });
    }

    loadPrograms(orgUnit){
        getAllProgramsByOrganization(orgUnit).then((programs) => {
            this.setState({programs: programs, program: '', programName: ''});
        }).catch((e) => {
            console.log('Error while loading programs', e.message);
        });
    }

    handleChangeSelect(identifier, value, name){
        let identifierName = identifier + 'Name';
        let identifierSelected = identifier + 'Selected';
        this.setState({[identifier]: value, [identifierName]: name, [identifierSelected]: true});
        if(identifier === 'orgUnit'){
            this.setState({programSelected: false})
            this.loadPrograms(value);
        }
        else if(identifier === 'program')
            console.log('Ready to find results with orgUnit: ' + this.state.orgUnit + ' and program: ' + value);
    }

    changeStartDate(value){
        this.setState({startDate: value});
    }

    changeEndDate(value){
        this.setState({endDate: value});
    }

    // Only supports data containing ids & displayName (e.g orgUnits & programs)
    renderSelect(title, identifier, data){
        return (
            <Typeahead
                bsStyle='default'
                options={data}
                labelKey={'displayName'}
                onChange={(event) => {
                    this.handleChangeSelect(identifier, event.id, event.displayName);
                }}
            />
        );
    }
    renderSelectOld(title, identifier, data){
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

    saveFavourite(){
        if(this.state.orgUnitSelected){
            const params = {
                orgUnit: this.state.orgUnit,
                program: this.state.program,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                orgUnitName: this.state.orgUnitName,
                programName: this.state.programName,
            }
            this.props.saveFavourite(params);
        }
    }

    saveRecent(){
        if(this.state.orgUnitSelected){
            const params = {
                orgUnit: this.state.orgUnit,
                program: this.state.program,
                startDate: this.state.startDate,
                endDate: this.state.endDate,
                orgUnitName: this.state.orgUnitName,
                programName: this.state.programName,
            }
            this.props.saveRecent(params);
        }
    }

    findResults(){
        const params = {
            orgUnit: this.state.orgUnit,
            program: this.state.program,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
        }
        this.saveRecent();
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

        if(this.state.orgUnitSelected === false){
            return (
                <div className='row text-center'>
                    <div className='col-sm-12'>
                        {this.renderSelect('Select Organization/Clinic', 'orgUnit', this.state.orgUnits)}
                    </div>
                </div>
            );
        }

        return (
            <div>
                <Row>
                    <Row>
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
                    </Row>
                    <div className='row'>
                        <Col sm={3} className='resBtn'>
                            <Button
                                bsStyle='primary'
                                onClick={this.findResults.bind(this)}
                                >Find Results</Button>
                        </Col>
                        <Col sm={3} className='favBtn pull-right'>
                            <Button
                                bsStyle='info'
                                onClick={this.saveFavourite.bind(this)}
                                >Add to Favourites</Button>
                        </Col>
                    </div>
                </Row>
            </div>
        );
    }
}

export default Select;
