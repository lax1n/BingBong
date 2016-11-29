import {getDataElements} from "../actions/data_element_actions"
export function transformDuplicates(duplicates, type){
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
