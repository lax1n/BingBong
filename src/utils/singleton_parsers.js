import {includes} from 'lodash';
import {getDataElements} from "../actions/data_element_actions"
export function parseSingletonQueryResults(response){
	let i, j;
	let singletons = [];
	getDisplayNameConverter(response).then((displayNameConverter) => {
		let attributesLength;
		let responseCount = response.length;
		console.log("Hello");
		console.log(displayNameConverter);
		for (i = 0; i < responseCount; i++) {
			singletons[i] = {};
			attributesLength = response[i].dataValues.length;
			for (j = 0; j < attributesLength; j++) {
				singletons[i][displayNameConverter[response[i].dataValues[j].dataElement]] = response[i].dataValues[j].value;
			}
			///XXX Do not remove, we might uncomment the addition of the other keys
			/*for(let key in response[i]){
				if (response[i].hasOwnProperty(key) && key !== "dataValues") {
					singletons[i][key] = response[i][key];
				}
			}*/
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
