import {serverUrl, basicAuth, onlySuccessResponses,} from './api';

export function saveThings(things){
	console.log("nyoom");
	return fetch(`${serverUrl}dataStore/BingBong/teis`, { method: 'PUT', 
		headers: {
        'Authorization': basicAuth,
        'Content-Type': 'application/json',
    },
		 body: JSON.stringify({
    	//firstParam: 'Yum',
    	//secondParam: things,
    	newParam: 'whatever',
 	}),
	})
        .then(onlySuccessResponses)
        .then(response => response.json());
}