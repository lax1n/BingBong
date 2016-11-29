import {saveThings, getThings} from "../actions/save_things.js"

export function pushMarkedToServer(duplicates){//These duplicates have been confirmed by an admin.
	console.log(duplicates);
	//saveThings('markedForReconciliation', JSON.stringify(duplicates));
	saveThings('markedForReconciliation', duplicates, 'DELETE');
	saveThings('markedForReconciliation', duplicates, 'POST');
}

export function updateMarked(duplicates, type){
	let key = type+"_duplicates";
	return getThings(key).then(function(prev){
		console.log("prev");
		console.log(prev);
		//saveThings(key, duplicates, 'DELETE');
		//saveThings(key, duplicates, 'POST');
		return saveThings(key, duplicates.concat(prev), 'PUT');
	});
}
