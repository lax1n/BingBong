import saveThings from "../../actions/save_things"

export function markForRecon(duplicates){//These duplicates have been confirmed by an admin.
	console.log(duplicates);
	//saveThings('markedForReconciliation', JSON.stringify(duplicates));
	saveThings('markedForReconciliation', duplicates);
}
