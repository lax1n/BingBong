export const serverUrl = 'https://play.dhis2.org/demo/api/';
export const basicAuth = `Basic ${btoa('admin:district')}`;

export const fetchOptionsGet = {
    method: 'GET',
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
