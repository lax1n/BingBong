



export function translateDuplicates(duplicates){
	
}

export function getReverseDisplayNameConverter(response){
	let i, j;
	let param_ids = [];
	let attributesLength;
	let responseCount = response.length;
	for (i = 0; i < responseCount; i++) {
		attributesLength = response[i].dataValues.length;
		for (j = 0; j < attributesLength; j++) {
			if(!(includes(param_ids, response[i].dataValues[j].dataElement))){
				param_ids.push(response[i].dataValues[j].dataElement);
			}
		}
	}
	return getDataElements(param_ids).then((displayNameObjects) => {
		let my_converter = {};
		for(i = 0; i<displayNameObjects.length; i++){
			my_converter[displayNameObjects[i].name] = displayNameObjects[i].id;
		}
		return my_converter;
	});
}
