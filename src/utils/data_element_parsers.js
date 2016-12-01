import {getDataElements} from "../actions/data_element_actions"
export function transformDuplicates(duplicates, type){
	/*This function removes the extra attributes added to duplicates. Transforming them into having the same format
	 *as they had when they were fetched.
	 *This can be used for reconciliation
	 */
	let valuesToRemove;
	if(type === "singleton"){
		return getDisplayNameConverterFromDuplicates(duplicates).then(function(myConverter){
			for(var i= 0; i<duplicates.length; i++){
				for(var j = 0; j<duplicates[i].length; j++){
					for(let key in duplicates[i][j].dataValues){
						if (duplicates[i][j].hasOwnProperty(key)) {
							delete duplicates[i][j][myConverter[key]];
						}
					}
					delete duplicates[i][j].reconcile;
				}
			}
			return duplicates;
		});
	}
	if(type === "tei"){
		for(var i= 0; i<duplicates.length; i++){
			for(var j = 0; j<duplicates[i].length; j++){
				for(let key in duplicates[i][j].attributes){
					if (duplicates[i][j].hasOwnProperty(key)) {
						delete duplicates[i][j][key];
					}
				}
				delete duplicates[i][j].reconcile;
			}
		}
		return duplicates;
	}
}

function getDisplayNameConverterFromDuplicates(duplicates){
	/*Same as getDisplayNameConverter, but this loops throught the duplicates to get the relevant attributes.
	 *It returns a dictionairy where the keys are the ids and the values are the displayNames of the teis/singletons.
	 */
	let i, j;
	let param_ids = [];
	let attributesLength;
	for(var i= 0; i<duplicates.length; i++){
		for(var j = 0; j<duplicates[i].length; j++){
			if(!(includes(param_ids, duplicates[i][j].dataElement))){
				param_ids.push(response[i][j].dataElement);
			}
		}
	}
	return getDataElements(param_ids).then((displayNameObjects) => {
		let my_converter = {};
		for(i = 0; i<displayNameObjects.length; i++){
			my_converter[displayNameObjects[i].id] = displayNameObjects[i].name
		}
		return my_converter;
	});
}
