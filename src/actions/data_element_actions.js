import {serverUrl, fetchOptionsGet, onlySuccessResponses} from './api';

// Returns array of all data elements with name and id
export function getAllDataElements(){
    return fetch(`${serverUrl}dataElements?paging=false&fields=id,name,dataSets[id,name]`, fetchOptionsGet)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(({ dataElements }) => dataElements);
}

// Takes an array of data element ids as parameter
// Returns array of a spesific set of data elements with name and id
export function getDataElements(dataElementIds){
    return fetch(`${serverUrl}dataElements?paging=false&fields=id,name,dataSets[id,name]&filter=id:in:[${dataElementIds}]`, fetchOptionsGet)
        .then(onlySuccessResponses)
        .then(response => response.json())
        .then(({ dataElements }) => dataElements);
}
