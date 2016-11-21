import {serverUrl, fetchOptionsGet, onlySuccessResponses} from './api';
const pageSize = 100;

export function getAllSingletonsByOrganization(orgUnitId){
    return fetch(`${serverUrl}events?orgUnit=${orgUnitId}&skipPaging=true`, fetchOptionsGet)
    //return fetch(`${serverUrl}events?orgUnit=${orgUnitId}&pageSize=${pageSize}`, fetchOptionsGet)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(( {events} ) => events);
}

export function getAllSingletonsByOrganizationAndProgram(orgUnitId, programId){
    return fetch(`${serverUrl}events?orgUnit=${orgUnitId}&program=${programId}&skipPaging=true`, fetchOptionsGet)
    //return fetch(`${serverUrl}events?orgUnit=${orgUnitId}&program=${programId}&pageSize=${pageSize}`, fetchOptionsGet)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(( {events} ) => events);
}
