import {serverUrl, basicAuth, fetchOptionsGet, onlySuccessResponses} from './api';

// The API doesn't like this unfortunately :/ (Method not allowed)
export function createDataStore(name = 'BingBong'){
    return fetch(`${serverUrl}dataStore/${name}`, {
		method: 'POST',
		headers: {
	        'Authorization': basicAuth,
	        'Content-Type': 'application/json',
        },
	}).then(onlySuccessResponses).then(response => response.json());
}

export function createDataStoreKey(key, data, name = 'BingBong'){
    return fetch(`${serverUrl}dataStore/${name}/${key}`, {
		method: 'POST',
		headers: {
	        'Authorization': basicAuth,
	        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
	}).then(onlySuccessResponses).then(response => response.json());
}

// The API doesn't like this unfortunately :/ (Method not allowed)
export function updateDataStores(dataStores){
    return fetch(`${serverUrl}dataStore`, {
		method: 'PUT',
		headers: {
	        'Authorization': basicAuth,
	        'Content-Type': 'application/json',
        },
		body: JSON.stringify(dataStores),
	}).then(onlySuccessResponses).then(response => response.json());
}

export function getAllDataStores(){
	return fetch(`${serverUrl}dataStore`, fetchOptionsGet)
		.then(onlySuccessResponses)
		.then(response => response.json());
}

export function getDataStore(name = 'BingBong'){
	return fetch(`${serverUrl}dataStore/${name}`, fetchOptionsGet)
		.then(onlySuccessResponses)
		.then(response => response.json());
}

// Multi purpose function to deal with unforseen things related to data stores
export function theFixer(namespace, key, data, method){
    return fetch(`${serverUrl}dataStore/${namespace}/${key}`, {
		method: method,
		headers: {
	        'Authorization': basicAuth,
	        'Content-Type': 'application/json',
        },
		body: JSON.stringify(data),
	}).then(onlySuccessResponses).then(response => response.json());
}


// How to remove our dataStore:
// Replace 'test' with whichever one that is used (e.g demo, dev)
// curl -X DELETE -u admin:district https://play.dhis2.org/test/api/dataStore/BingBong
