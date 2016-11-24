import {getEditDistance} from '../libs/levenshtein';
import {contains} from './contains';
//import {getNorrisJoke} from '../actions/norris_actions';

import {isEmpty} from 'lodash';

export function isDuplicate(obj1, obj2, loose_test_params, strict_test_params, maxEditDistance, max_undefined_count){
	max_undefined_count = max_undefined_count || 0;
	var editDistance = -1;
	let undefined_count = 0; //This counts the amount of instances where one of the objects is undefined while the other one isn't
	if(isEmpty(obj1) || isEmpty(obj2)){
		return false;
	}
	for (let i = 0; i<loose_test_params.length; i++){ //Looping over all the relevant parameters
		if((obj1[loose_test_params[i]] !== "") && (obj1[loose_test_params[i]] !== undefined)){
			undefined_count += 1;
			if((obj2[loose_test_params[i]] !== "")  && (obj2[loose_test_params[i]] !== undefined)){
				undefined_count -= 1;
				if(obj1[loose_test_params[i]] !== obj2[loose_test_params[i]]){ //Checking if they are equal
					editDistance = getEditDistance(obj1[loose_test_params[i]], obj2[loose_test_params[i]]); //Calculating the editDistance
					if(editDistance > maxEditDistance){
						return false;
					}
				}
			}
		}
		else if((obj2[loose_test_params[i]] !== "")  && (obj2[loose_test_params[i]] !== undefined)){
			undefined_count += 1;
		}
	}
	for (let i = 0; i<strict_test_params.length; i++){ //Looping over all the relevant parameters
		if((obj1[strict_test_params[i]] !== "") && (obj1[strict_test_params[i]] !== undefined)){
			undefined_count += 1;
			if((obj2[strict_test_params[i]] !== "")  && (obj2[strict_test_params[i]] !== undefined)){
				undefined_count -= 1;
				if(obj1[strict_test_params[i]] !== obj2[strict_test_params[i]]){ //Checking if they are equal
					return false;
				}
			}
		}
		else if((obj2[strict_test_params[i]] !== "")  && (obj2[strict_test_params[i]] !== undefined)){
			undefined_count += 1;
		}
	}
	if(undefined_count > max_undefined_count){
		return false;
	}

	return true;
}

export function findDuplicatePeople(teis, loose_test_params, strict_test_params, maxEditDistance, maxUndefinedCount){
	let duplicates = [];
	loose_test_params = loose_test_params || ["First name", "Last name", "Date of birth", "Mothers maiden name"];
	strict_test_params = strict_test_params || ["Blood type"];
	let duplicate_indexes = []
	maxEditDistance = maxEditDistance || 2;
	maxUndefinedCount = maxUndefinedCount || 100;
	if(isEmpty(teis)){
		console.log("No teis passed");
		return undefined;//[[{}]];
	}
	//teis.forEach((tei, i) => {
	let i, j;
	for(i = 0; i<teis.length; i++){
		let tei = teis[i];
		let tempDuplicates = []
		//teis.forEach((tempTei, j) => {
		for(j = 0; j<teis.length; j++){
			let tempTei = teis[j];
			if(i !== j && !contains(i, duplicate_indexes) && isDuplicate(tei, tempTei, loose_test_params,strict_test_params, maxEditDistance, maxUndefinedCount)){
				tempDuplicates.push(teis[j]);
				duplicate_indexes.push(j);
			}
		}//);
		if (!(isEmpty(tempDuplicates))){
			tempDuplicates.push(tei);
			duplicates.push(tempDuplicates);
		}
	}//);
	if(isEmpty(duplicates)){
		console.log("No duplicates found");
		return undefined;//[[{}]];
	}
	return duplicates;
}

export function getTip(){
	return "Remember to wash your hands";
}
