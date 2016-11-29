import {serverUrl, basicAuth, fetchOptionsGet, onlySuccessResponses,} from './api';

export function saveThings(key,things){
    let items = getThings(key);
    console.log("forgot to add this: "+items);
    //items.push(things);
	return fetch(`${serverUrl}dataStore/BingBong/${key}`, { method: 'PUT', 
		headers: {
        'Authorization': basicAuth,
        'Content-Type': 'application/json',
    },
		 body: JSON.stringify({
            items,
 	}),
	})
        .then(onlySuccessResponses)
        .then(response => response.json());
}

export function getThings(key){
    return fetch(`${serverUrl}dataStore/BingBong/${key}`, fetchOptionsGet)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then((things) => things);
}

//curl "https://play.dhis2.org/demo/api/dataStore/BingBong/[key]" -X POST -H "Content-Type: application/json" -d "{\"BingBong\":\"recents\"}" -u admin:district -v 
