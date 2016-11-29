import {saveThings, getThings} from "../actions/save_things.js"
import {includes, isEmpty} from "lodash"

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
		console.log("duplicates", duplicates)
		let myDuplicates = findNewDups(duplicates, prev, type);
		console.log("myDuplicates", myDuplicates);
		saveThings(key_mark, prev.concat(myDuplicates), 'PUT');

	});
}

function findNewDups(duplicates, prev, type){
	let newDups = [];
	let checker1, checker2;
	if(type === "tei"){
		checker1 = "trackedEntityInstance";
		checker2 =  "Instance";
	}
	if(type === "singleton"){
		checker1 = "event";
		checker2 =  "event";
	}
	console.log("prev", prev);
	let prevLength= prev.length;
	return duplicates.filter(function(dupGroup){
		for(let j = 0; j < dupGroup.length; j++){
			for(let k = 0; k < prevLength; k++){
				for(let l= 0; l < prev[k].length; l++){
					//console.log("j"+j+"k"+k+"l"+l);
					//console.log("dupGroup", dupGroup, "prev[k]", prev[k]);
					//console.log(dupGroup[j], "=== ", prev[k][l])
					//console.log(dupGroup[j][checker1], dupGroup[j][checker2], "=== ", prev[k][l][checker1], prev[k][l][checker2])
					if((dupGroup[j][checker1] || dupGroup[j][checker2]) === (prev[k][l][checker1] || prev[k][l][checker2])){
						//console.log("OHOHOH");
						//console.log("OHOHOH");
						//console.log("OHOHOH");
						return false;
					}
					else{
						//console.log("continuing")
					}
				}
			}
		}
		return true;
	});
}
