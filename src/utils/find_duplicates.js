import {getAllTEIsByOrganizationAndProgram} from '../actions/tei_actions';
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
	var editDistance = -1;
	for (var i = 0; i<test_params.length; i++){
		if(!((obj1[test_params[i]] === "") || (obj1[test_params[i]] === ""))){
			if((obj1[test_params[i]] === obj2[test_params[i]]) === false){
				editDistance = getEditDistance(obj1[test_params[i]], obj2[test_params[i]]);
				if(editDistance > 3){
					//console.log(obj1[test_params[i]] +" , "+ obj2[test_params[i]]+": "+editDistance);
					return false;
				}
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
	var test_params = ["First name", "Last name", "Date of birth", "Blood type", "Mothers maiden name"];
	let duplicate_indexes = []
	teis.forEach((tei, i) => {
		let tempDuplicates = []
		teis.forEach((tempTei, j) => {
			if(i !== j && !contains(i, duplicate_indexes) && isDuplicate(tei, tempTei, test_params)){
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
