export const serverUrl = 'https://play.dhis2.org/demo/api/';
//export const serverUrl = `http://localhost:8080/api/`;
//export const serverUrl = 'https://play.dhis2.org/test/api/';
export const basicAuth = `Basic ${btoa('admin:district')}`;

export const fetchOptionsGet = {
    method: 'GET',
    headers: {
        'Authorization': basicAuth,
        'Content-Type': 'application/json',
    },
};

export const postOptions = {
    method: 'POST',
    headers: {
        'Authorization': basicAuth,
        'Content-Type': 'application/json',
    },
};

export const deleteOptions = {
    method: 'DELETE',
    headers: {
        'Authorization': basicAuth,
        'Content-Type': 'application/json',
    },
};


export function onlySuccessResponses(response) {
    console.log(response);
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    }
    return Promise.reject(response);
}
