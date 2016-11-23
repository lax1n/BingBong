import {fetchOptionsGet, onlySuccessResponses} from './api';

//const serverUrl = 'http://localhost:5000/api/';
const serverUrl = 'https://vast-hamlet-61059.herokuapp.com/api/';

const fetchOptionsPost = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        query: {
            name: 'Quaky',
            org_unit: 'cykaaaa',
            end_date: '21/12/2013',
            identifier: 'recent',
        },
    }),
};

export function saveRecentQuery(orgUnitId){
    return fetch(`${serverUrl}queries`, fetchOptionsPost)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(({ query }) => query);
}
