import {serverUrl, basicAuth, fetchOptionsGet, onlySuccessResponses} from './api';

/*Function for general saving/fetching/deleting items from the data store, recieves namespace key and whatever needs to be saved*/
export function saveThings(key, things, methodType = 'PUT'){
    return fetch(`${serverUrl}dataStore/BingBong/${key}`, {
		method: methodType,
		headers: {
        'Authorization': basicAuth,
        'Content-Type': 'application/json',
        },
		 body: JSON.stringify(
            things
 	    ),
	}).then(onlySuccessResponses).then(response => response.json());
}

/*Function for fetching from the data store; recieves namespace key and returns contents*/
export function getThings(key){
    return fetch(`${serverUrl}dataStore/BingBong/${key}`, fetchOptionsGet)
        .then(onlySuccessResponses)
        .then(response => response.json());
}

/* The terminal code for making namespaces/keys:
curl "https://play.dhis2.org/demo/api/dataStore/BingBong/Srecents" -X POST -H "Content-Type: application/json" -d "{\"items\":\"things {}\"}" -u admin:district -v
*/