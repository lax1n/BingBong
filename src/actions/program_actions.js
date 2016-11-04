import {serverUrl, fetchOptionsGet, onlySuccessResponses} from './api';

export function getAllProgramsByOrganization(orgUnitId){
    return fetch(`${serverUrl}organisationUnits/${orgUnitId}?fields=programs[id,displayName]`, fetchOptionsGet)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(({ programs }) => programs);
}
