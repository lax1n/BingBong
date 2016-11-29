import {saveThings, getThings} from "../actions/save_things.js"

export function updateMarked(duplicates, type){//These duplicates have been confirmed by an admin.
	let key = type+"_duplicates";
	//saveThings(key, duplicates, 'POST');
	//saveThings("tei_ignore_list",undefined, 'POST');
	//saveThings("singleton_ignore_list",undefined, 'POST');
	//saveThings("singleton_duplicates",undefined, 'POST');
	return getThings(key).then(function(prev){
		console.log("prev");
		console.log(prev);


		//saveThings(key, duplicates, 'DELETE');
		//saveThings(key, duplicates, 'POST');
		console.log(duplicates)
		return saveThings(key, prev.concat(duplicates), 'PUT');
	});
}
