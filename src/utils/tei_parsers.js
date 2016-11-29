export function parseQueryResultsOrgOnly(response){
	let i, j;
	let teis = [];
	let attributesLength;
	let responseCount = response.length;
	for (i = 0; i < responseCount; i++) {
		teis[i] = {};
		attributesLength = response[i].attributes.length;
		for(let key in response[i]){
			if (response[i].hasOwnProperty(key) && key !== "attributes") {
				teis[i][key] = response[i][key];
			}
		}
		for (j = 0; j < attributesLength; j++) {
			teis[i][response[i].attributes[j].displayName] = response[i].attributes[j].value;
		}
		teis[i].attributes = response[i].attributes; //Stored for reconciliation
	}
	return teis;
}

export function parseQueryResults(response){
	let i, j;
	let teis = [];
	let headerCount = response.headers.length;
	let instanceCount = response.rows.length;
	for (i = 0; i < instanceCount; i++) {
		teis[i] = {};
		for (j = 0; j < headerCount; j++) {
			teis[i][response.headers[j].column] = response.rows[i][j];
		}
	}
	return teis;
}
