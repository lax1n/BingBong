import {serverUrl, fetchOptionsGet, onlySuccessResponses} from './api';

export function getAllTEIsByOrganization(orgUnitId){
    return fetch(`${serverUrl}trackedEntityInstances?ou=${orgUnitId}`, fetchOptionsGet)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(( {trackedEntityInstances} ) => trackedEntityInstances);
}

export function getAllTEIsByOrganizationAndProgram(orgUnitId, programId){
    return fetch(`${serverUrl}trackedEntityInstances/query?ou=${orgUnitId}&program=${programId}`, fetchOptionsGet)
        .then(onlySuccessResponses)
        .then(response => response.json());
        //.then(( response ) => response);
}
