import {includes} from 'lodash';
export function parseSingletonQueryResults(response){
	let i, j;
	let singletons = [];
	let categories = [];
	let attributesLength;
	let responseCount = response.length;
	//console.log("Quaky");
	//console.log(response);
	//console.log(responseCount);
	//console.log(response[0].dataValues);
	//console.log(response[0].dataValues.length);
	for (i = 0; i < responseCount; i++) {
		singletons[i] = {};
		//console.log("singletons")
		//console.log(singletons)
		attributesLength = response[i].dataValues.length;
		//console.log(response[i].dataValues.length);
		for (j = 0; j < attributesLength; j++) {
			//console.log("j: " + j);
			//console.log(response[i].dataValues[j].dataElement);
			//console.log(response[i].dataValues[j].value);
			singletons[i][response[i].dataValues[j].dataElement] = response[i].dataValues[j].value;
			if(!(includes(categories, response[i].dataValues[j].dataElement))){
				categories.push(response[i].dataValues[j].dataElement);
			}
		}
		for(let key in response[i]){
			if (response[i].hasOwnProperty(key) && key !== "dataValues") {
				singletons[i][key] = response[i][key];
			}
		}
		/*singletons[i]['event'] = response[i].event;
		singletons[i]['program'] = response[i].program;*/

	}
	console.log("Singletons")

	console.log(singletons)
	console.log("categories")
	console.log(categories)
	return [singletons, categories];
}
