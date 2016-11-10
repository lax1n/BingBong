import {getAllTEIsByOrganizationAndProgram} from '../actions/tei_actions';
import {getNorrisJoke} from '../actions/norris_actions';

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
export function isDuplicate(obj1, obj2){
	/*
	const attributes = {
		"Instance": false,
		"First name": true,
		"Last name": true,
		"Date of birth": true,
	}
	*/
	return (
		//(obj1["Instance"] !== obj2["Instance"]) &&
		(obj1["First name"] === obj2["First name"]) &&
		(obj1["Last name"] === obj2["Last name"]) &&
		(obj1["Date of birth"] === obj2["Date of birth"])
	)
}

export function findDuplicatePeople(teis){
	let duplicates = [];
	teis.forEach((tei, i) => {
		let tempDuplicates = []
		teis.forEach((tempTei, j) => {
			if(isDuplicate(tei, tempTei)){
				// Add duplicate to tempDuplicates & remove it from teis to avoid redundancy later
				tempDuplicates.push(tempTei);

				// NOTE TO SELF: THIS MIGHT DELETE THE WRONG ELEMENT FOR FUCK SAKEEEEE ARRRRGHHHHHHH
				teis.splice(j, 1);

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
