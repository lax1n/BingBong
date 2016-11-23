export function contains(needle, indexes) {
	for(var i = 0; i<indexes.length; i++){
		if(needle === indexes[i]){
			return true;
		}
	}
	return false;
}
