import {serverUrl, basicAuth, fetchOptionsGet, onlySuccessResponses} from './api';

export function createDataStore(name = 'BingBong'){
    return fetch(`${serverUrl}dataStore/${name}`, {
		method: 'POST',
		headers: {
	        'Authorization': basicAuth,
	        'Content-Type': 'application/json',
        },
	}).then(onlySuccessResponses).then(response => response.json());
}

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
