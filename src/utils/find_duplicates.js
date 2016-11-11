import {getAllTEIsByOrganizationAndProgram} from '../actions/tei_actions';
//import {getNorrisJoke} from '../actions/norris_actions';

import {isEmpty} from 'lodash';

export function findTEIDuplicatesByOrganizationAndProgram(orgUnit, program){
	return getAllTEIsByOrganizationAndProgram(orgUnit, program).then((response) => {
		const teis = parseQueryResults(response);
		const duplicates = findDuplicatePeople(teis);
		return duplicates;
	});
}

export function parseQueryResults(response){
	let i, j;
	let teis = [];
	let headerCount = response.headers.length;
	let instanceCount = response.rows.length;
	for (i = 0; i < instanceCount; i++) {
		teis[i] = {};
		for (j = 0; j < headerCount; j++) {
			teis[i][response.headers[j].column] = response.rows[i][j];
		}
	}
	return teis;
}
// This function does not take empty values into account, e.g last name "" will be evaluated as a duplicate if both are empty.
export function isDuplicate(obj1, obj2, test_params){
	/*
	const attributes = {
		"Instance": false,
		"First name": true,
		"Last name": true,
		"Date of birth": true,
	}
	*/
	//console.log(test_params);
	for (var i = 0; i<test_params.length; i++){
		if(!((obj1[test_params[i]] === "") || (obj1[test_params[i]] === ""))){
			if((obj1[test_params[i]] === obj2[test_params[i]]) === false){
				return false;
			}
		}
	}
	return true
	/*return (
		//(obj1["Instance"] !== obj2["Instance"]) &&
		(obj1["First name"] === obj2["First name"]) &&
		(obj1["Last name"] === obj2["Last name"]) &&
		(obj1["Date of birth"] === obj2["Date of birth"])
	)*/
}

export function contains(needle, indexes) {
	for(var i = 0; i<indexes.length; i++){
		if(needle == indexes[i]){
			return true;
		}
	}
	return false;
}

export function findDuplicatePeople(teis){
	let duplicates = [];
	var test_params = ["First name", "Last name", "Date of birth", "Blood type"];
	let duplicate_indexes = []
	teis.forEach((tei, i) => {
		let tempDuplicates = []
		teis.forEach((tempTei, j) => {
			if(i !== j && !contains(i, duplicate_indexes) && isDuplicate(tei, tempTei, test_params)){
				// Add duplicate to tempDuplicates & remove it from teis to avoid redundancy later
				tempDuplicates.push(teis[j]);
				duplicate_indexes.push(j);

				// NOTE TO SELF: THIS MIGHT DELETE THE WRONG ELEMENT FOR FUCK SAKEEEEE ARRRRGHHHHHHH
				//teis.splice(j, 1);
				//console.log(j);
				//console.log(teis[j]);

				// Some logs
				//console.log("Possible duplicate found:");
				//console.log(tei);
				//console.log(tempTei);
			}
		});
		if (!(isEmpty(tempDuplicates))){
			// Add original to duplicate list as well
			tempDuplicates.push(tei);
			// Remove original from teis
			//teis.splice(i, 1);
			// Add array of duplcliates to duplicates
			duplicates.push(tempDuplicates);
		}
	});
	return duplicates;
}

export function getTip(){
	return "Remember to wash your hands"
}
