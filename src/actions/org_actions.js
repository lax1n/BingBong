import {serverUrl, basicAuth, fetchOptionsGet, onlySuccessResponses} from './api';

export function getAllOrganizations(){
    console.log(serverUrl);
    console.log(fetchOptionsGet);
    fetch(`${serverUrl}organisationUnits`, fetchOptionsGet)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(({ organisationUnits }) => console.log(organisationUnits));
}
//?fields=[id,displayName]
//organisationUnits/DiszpKrYNg8.json?fields=programs[id,displayName]
//curl -D- -X GET -H "Authorization: Basic YWRtaW46ZGlzdHJpY3Q=" -H "Content-Type: application/json" https://play.dhis2.org/demo/api/organisationUnits?fields=[id,displayName]
