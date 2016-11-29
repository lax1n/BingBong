import {serverUrl, basicAuth, fetchOptionsGet, onlySuccessResponses,} from './api';

export function saveThings(key,things){
	return fetch(`${serverUrl}dataStore/BingBong/${key}`, { method: 'PUT', 
		headers: {
        'Authorization': basicAuth,
        'Content-Type': 'application/json',
    },
		 body: JSON.stringify({
            things,
 	}),
	})
        .then(onlySuccessResponses)
        .then(response => response.json());
}

export function getThings(key){
    return fetch(`${serverUrl}dataStore/BingBong/${key}`, fetchOptionsGet)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(( {things} ) => things);
}