import {saveThings, getThings} from "../actions/save_things.js"

export function updateMarked(duplicates, type){//These duplicates have been confirmed by an admin.
	let key_mark = type+"_duplicates";
	let key_dedup = type+"_ignore_list";
	//saveThings(key_mark, duplicates, 'POST');
	//saveThings("tei_ignore_list",undefined, 'POST');
	//saveThings("singleton_ignore_list",undefined, 'POST');
	//saveThings("singleton_duplicates",undefined, 'POST');
	return getThings(key_mark).then(function(prev){
		console.log("prev");
		console.log(prev);


		//saveThings(key, duplicates, 'DELETE');
		//saveThings(key, duplicates, 'POST');
		console.log(duplicates)
		saveThings(key_mark, prev.concat(duplicates), 'PUT');
		let newIgnoreValues = [];
		for(var i = 0; i < duplicates.length; i++){
			for(var j = 0; j< duplicates[i].length; j++){
				//newIgnoreValues.push
			}
		}
	});
}
