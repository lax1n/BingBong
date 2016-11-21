import {includes} from 'lodash';
import {getDataElements} from "../actions/data_element_actions"
export function parseSingletonQueryResults(response){
	let i, j;
	let singletons = [];
	getDisplayNameConverter(response).then((displayNameConverter) => {
		let attributesLength;
		let responseCount = response.length;
		let my_counter = 0;
		console.log("Hello");
		console.log(displayNameConverter);
		for (i = 0; i < responseCount; i++) {
			if(response[i].trackedEntityInstance){
				continue;
			}
			singletons[my_counter] = {};
			attributesLength = response[i].dataValues.length;
			for (j = 0; j < attributesLength; j++) {
				singletons[my_counter][displayNameConverter[response[i].dataValues[j].dataElement]] = response[i].dataValues[j].value;
			}
			for(let key in response[i]){
				if (response[i].hasOwnProperty(key) && key !== "dataValues") {
					singletons[my_counter][key] = response[i][key];
				}
			}
			my_counter += 1;
		}
		console.log("Singletons")
		console.log(singletons)
		return singletons
	});
}
function getDisplayNameConverter(response){
	let i, j;
	let categories = [];
	let attributesLength;
	let responseCount = response.length;
	for (i = 0; i < responseCount; i++) {
		attributesLength = response[i].dataValues.length;
		for (j = 0; j < attributesLength; j++) {
			if(!(includes(categories, response[i].dataValues[j].dataElement))){
				categories.push(response[i].dataValues[j].dataElement);
			}
		}
	}
	return getDataElements(categories).then((displayNameObjects) => {
		let my_converter = {};
		for(i = 0; i<displayNameObjects.length; i++){
			my_converter[displayNameObjects[i].id] = displayNameObjects[i].name
		}
		return my_converter;
	});
}
