import {serverUrl, fetchOptionsGet, onlySuccessResponses} from './api';

export function getAllSingletonsByOrganization(orgUnitId){
    return fetch(`${serverUrl}events?orgUnit=${orgUnitId}&pageSize=100000`, fetchOptionsGet)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(( {events} ) => events);
}

export function getAllSingletonsByOrganizationAndProgram(orgUnitId, programId){
    return fetch(`${serverUrl}events?orgUnit=${orgUnitId}&program=${programId}&pageSize=100000`, fetchOptionsGet)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(( {events} ) => events);
}
