import {getAllTEIsByOrganizationAndProgram, getAllTEIsByOrganization} from '../actions/tei_actions';
import {getEditDistance} from '../libs/levenshtein';
//import {getNorrisJoke} from '../actions/norris_actions';

import {isEmpty} from 'lodash';


export function findTEIDuplicatesByOrganizationAndProgram(orgUnit, program){
	return getAllTEIsByOrganizationAndProgram(orgUnit, program).then((response) => {
		const teis = parseQueryResults(response);
		const duplicates = findDuplicatePeople(teis);
		return duplicates;
	});
}
export function findTEIDuplicatesByOrganization(orgUnit){
	return getAllTEIsByOrganization(orgUnit).then((response) => {
		const teis = parseQueryResultsOrgOnly(response);
		const duplicates = findDuplicatePeople(teis);
		return duplicates;
	});
}

export function parseQueryResultsOrgOnly(response){
	let i, j;
	let teis = [];
	let attributesLength;
	let responseCount = response.length;
	for (i = 0; i < responseCount; i++) {
		teis[i] = {};
		attributesLength = response[i].attributes.length;
		teis[i]['Instance'] = response[i]['trackedEntityInstance'];
		for (j = 0; j < attributesLength; j++) {
			//console.log(response[i].attributes[j].displayName);
			teis[i][response[i].attributes[j].displayName] = response[i].attributes[j].value;
		}
		//console.log(teis);
	}
	//console.log(teis)
	return teis;
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
export function isDuplicate(obj1, obj2, loose_test_params, strict_test_params, maxEditDistance){
	//console.log(test_params);
	var editDistance = -1;
	for (let i = 0; i<loose_test_params.length; i++){ //Looping over all the relevant parameters

		if(!((obj1[loose_test_params[i]] === "") || (obj2[loose_test_params[i]] === "") || (obj1[loose_test_params[i]] === undefined) || (obj2[loose_test_params[i]] === undefined))){ //Ignoring if one of them are empty
			if((obj1[loose_test_params[i]] === obj2[loose_test_params[i]]) === false){ //Checking if they are equal
				editDistance = getEditDistance(obj1[loose_test_params[i]], obj2[loose_test_params[i]]); //Calculating the editDistance
				if(editDistance > maxEditDistance){
					return false;
				}
			}
		}
	}
	for (let i = 0; i<strict_test_params.length; i++){ //Looping over all the relevant parameters
		if(!((obj1[strict_test_params[i]] === "") || (obj2[strict_test_params[i]] === "") || (obj1[strict_test_params[i]] === undefined) || (obj2[strict_test_params[i]] === undefined))){ //Ignoring if one of them are empty
			if((obj1[strict_test_params[i]] === obj2[strict_test_params[i]]) === false){ //Checking if they are equal
				return false;
			}
		}
	}
	return true;
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
	var loose_test_params = ["First name", "Last name", "Date of birth", "Blood type", "Mothers maiden name"];
	var strict_test_params = ["Blood type"];
	let duplicate_indexes = []
	let maxEditDistance = 2;
	teis.forEach((tei, i) => {
		let tempDuplicates = []
		teis.forEach((tempTei, j) => {
			if(i !== j && !contains(i, duplicate_indexes) && isDuplicate(tei, tempTei, loose_test_params,strict_test_params, maxEditDistance)){
				tempDuplicates.push(teis[j]);
				duplicate_indexes.push(j);
			}
		});
		if (!(isEmpty(tempDuplicates))){
			tempDuplicates.push(tei);
			duplicates.push(tempDuplicates);
		}
	});
	return duplicates;
}

export function getTip(){
	return "Remember to wash your hands"
}
