import {saveThings, getThings} from "../actions/save_things.js"

export function updateMarked(duplicates, type){//These duplicates have been confirmed by an admin.
	//uploads the ones that are marked for reconciliation to the dataStore
	let key_mark = type+"_duplicates";
	return getThings(key_mark).then(function(prev){
		console.log("prev",prev);
		console.log("duplicates", duplicates)
		let myDuplicates = findNewDups(duplicates, prev, type);
		console.log("myDuplicates", myDuplicates);
		saveThings(key_mark, prev.concat(myDuplicates), 'PUT');

	});
}

function findNewDups(duplicates, prev, type){
	//Checks wheter a duplicate pair is already present.
	let checker1, checker2;
	if(type === "tei"){
		checker1 = "trackedEntityInstance";
		checker2 =  "Instance";
	}
	if(type === "singletons"){
		checker1 = "event";
		checker2 =  "event";
	}
	let prevLength= prev.length;
	return duplicates.filter(function(dupGroup){
		for(let j = 0; j < dupGroup.length; j++){
			for(let k = 0; k < prevLength; k++){
				for(let l= 0; l < prev[k].length; l++){
					if((dupGroup[j][checker1] || dupGroup[j][checker2]) === (prev[k][l][checker1] || prev[k][l][checker2])){
						console.log(dupGroup[j], prev[k][l]);
						return false;
					}
				}
			}
		}
		return true;
	});
}
