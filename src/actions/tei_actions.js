import {serverUrl, fetchOptionsGet, onlySuccessResponses} from './api';

export function getAllTEIsByOrganization(orgUnitId){
    return fetch(`${serverUrl}trackedEntityInstances?ou=${orgUnitId}`, fetchOptionsGet)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(({ TEIs }) => TEIs);
}
