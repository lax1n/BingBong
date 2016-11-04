import {serverUrl, fetchOptionsGet, onlySuccessResponses} from './api';

// Add '&paging=false' to the url to include ALL units at once. Might be time consuming for testing.
export function getAllOrganizations(){
    return fetch(`${serverUrl}organisationUnits?fields=[id,displayName]`, fetchOptionsGet)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(({ organisationUnits }) => organisationUnits);
}
//organisationUnits/DiszpKrYNg8.json?fields=programs[id,displayName]
//curl -D- -X GET -H "Authorization: Basic YWRtaW46ZGlzdHJpY3Q=" -H "Content-Type: application/json" https://play.dhis2.org/demo/api/organisationUnits?fields=[id,displayName]
