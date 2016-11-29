import {saveThings, getThings} from "../actions/save_things.js"

export function updateMarked(duplicates, type){//These duplicates have been confirmed by an admin.
	let key = type+"_duplicates";
	return getThings(key).then(function(prev){
		console.log("prev");
		console.log(prev);
		//saveThings(key, duplicates, 'DELETE');
		//saveThings(key, duplicates, 'POST');
		return saveThings(key, duplicates.concat(prev.things), 'PUT');
	});
}
