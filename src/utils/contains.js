export function contains(needle, indexes) {
	//This function tests whether the given needle is in the given array indexes. Returns true if it is and false otherwise.
	for(var i = 0; i<indexes.length; i++){
		if(needle === indexes[i]){
			return true;
		}
	}
	return false;
}
