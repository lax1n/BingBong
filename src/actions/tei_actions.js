import {serverUrl, fetchOptionsGet, onlySuccessResponses} from './api';

export function getAllTEIsByOrganization(orgUnitId){
    return fetch(`${serverUrl}trackedEntityInstances?ou=${orgUnitId}&skipPaging=true`, fetchOptionsGet)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(( {trackedEntityInstances} ) => trackedEntityInstances);
}

export function getAllTEIsByOrganizationAndProgram(orgUnitId, programId){
    return fetch(`${serverUrl}trackedEntityInstances/query?ou=${orgUnitId}&program=${programId}&paging=false`, fetchOptionsGet)
        .then(onlySuccessResponses)
        .then(response => response.json());
        //.then(( response ) => response);
}
