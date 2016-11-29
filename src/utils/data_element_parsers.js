export function transformDuplicates(duplicates, type){
	let valuesToRemove;
	if(type === "singleton"){
		valuesToRemove = "dataValues";
	}
	if(type === "tei"){
		valuesToRemove = "attributes";
	}
	for(var i= 0; i<duplicates.length; i++){
		for(var j = 0; j<duplicates[i].length; j++){
			for(let key in eval("duplicates[i][j]"+ valuesToRemove)){
				if (duplicates[i][j].hasOwnProperty(key) && key !== "dataValues") {
					delete duplicates[i][j][key];
				}
			}
		}
	}
}
