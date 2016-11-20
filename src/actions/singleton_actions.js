import {serverUrl, fetchOptionsGet, onlySuccessResponses} from './api';

export function getAllSingletonsByOrganization(orgUnitId){
    return fetch(`${serverUrl}events?orgUnit=${orgUnitId}&skipPaging=true`, fetchOptionsGet)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(( {events} ) => events);
}

export function getAllSingletonsByOrganizationAndProgram(orgUnitId, programId){
    return fetch(`${serverUrl}events?orgUnit=${orgUnitId}&program=${programId}&skipPaging=true`, fetchOptionsGet)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(( {events} ) => events);
}
