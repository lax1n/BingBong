import {saveThings, getThings} from "../actions/save_things.js"

export function pushMarkedToServer(duplicates){//These duplicates have been confirmed by an admin.
	console.log(duplicates);
	//saveThings('markedForReconciliation', JSON.stringify(duplicates));
	saveThings('markedForReconciliation', duplicates, 'DELETE');
	saveThings('markedForReconciliation', duplicates, 'POST');
}
