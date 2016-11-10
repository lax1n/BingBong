import {onlySuccessResponses} from './api';

// Add '&paging=false' to the url to include ALL units at once. Might be time consuming for testing.
export function getNorrisJoke(){
    return fetch(`http://api.icndb.com/jokes/random`)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(({ value }) => value);
}
