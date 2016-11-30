/*
 * Note to self & other developers:
 * If there are preflight erros, remember to
 * whitelist the client url in the respective server settings (e.g dhis2 demo settings)
 */

//export const serverUrl = `http://localhost:8080/api/`; // Localhost
//export const serverUrl = 'https://play.dhis2.org/demo/api/'; // Demo
export const serverUrl = 'https://play.dhis2.org/test/api/'; // Test
//export const serverUrl = 'https://play.dhis2.org/dev/api/'; // Dev


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
