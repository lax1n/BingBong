import {serverUrl, basicAuth, fetchOptionsGet, onlySuccessResponses,} from './api';

export function saveThings(key,things, myMethod){
    /*return getThings(key).then((items) => {
        console.log("forgot to add this: ",items);
        items.things.push(things);*/
		console.log("saving Things");
		myMethod = myMethod || 'PUT';
	    return fetch(`${serverUrl}dataStore/BingBong/${key}`, { method: myMethod,
    		headers: {
            'Authorization': basicAuth,
            'Content-Type': 'application/json',
            },
    		 body: JSON.stringify({
                things,
     	    }),
    	}).then(onlySuccessResponses).then(response => response.json());
}

export function getThings(key){
    return fetch(`${serverUrl}dataStore/BingBong/${key}`, fetchOptionsGet)
        .then(onlySuccessResponses)
        .then(response => response.json());
}

//curl "https://play.dhis2.org/demo/api/dataStore/BingBong/Srecents" -X POST -H "Content-Type: application/json" -d "{\"items\":\"things {}\"}" -u admin:district -v
