import {getEditDistance} from '../libs/levenshtein';
import {contains} from './contains';
//import {getNorrisJoke} from '../actions/norris_actions';

import {isEmpty} from 'lodash';

// This function does not take empty values into account, e.g last name "" will be evaluated as a duplicate if both are empty.
export function isDuplicate(obj1, obj2, loose_test_params, strict_test_params, maxEditDistance, max_undefined_count){
	//console.log(test_params);
	max_undefined_count = max_undefined_count || 0;
	var editDistance = -1;
	let undefined_count = 0; //This counts the amount of instances where one of the objects is undefined while the other one isn't
	if(isEmpty(obj1) || isEmpty(obj2)){
		return false;
	}
	for (let i = 0; i<loose_test_params.length; i++){ //Looping over all the relevant parameters

		if((obj1[strict_test_params[i]] !== "") && (obj1[strict_test_params[i]] !== undefined)){
			undefined_count += 1;
			if((obj2[strict_test_params[i]] !== "")  && (obj2[strict_test_params[i]] !== undefined)){
				undefined_count -= 1;
				if(obj1[loose_test_params[i]] !== obj2[loose_test_params[i]]){ //Checking if they are equal
					editDistance = getEditDistance(obj1[loose_test_params[i]], obj2[loose_test_params[i]]); //Calculating the editDistance
					console.log("editDistance", editDistance);
					if(editDistance > maxEditDistance){
						return false;
					}
				}
			}
		}
		else if((obj2[strict_test_params[i]] !== "")  && (obj2[strict_test_params[i]] !== undefined)){
			undefined_count += 1;
		}
	}
	for (let i = 0; i<strict_test_params.length; i++){ //Looping over all the relevant parameters
		/*if(strict_test_params[i] === "MCH OPV dose"){
			//console.log(obj1[strict_test_params[i]] + "===" + obj2[strict_test_params[i]]);
		}*/
		if((obj1[strict_test_params[i]] !== "") && (obj1[strict_test_params[i]] !== undefined)){
			undefined_count += 1;
			if((obj2[strict_test_params[i]] !== "")  && (obj2[strict_test_params[i]] !== undefined)){
				undefined_count -= 1;
				if(obj1[strict_test_params[i]] !== obj2[strict_test_params[i]]){ //Checking if they are equal
					/*if(strict_test_params[i] === "MCH OPV dose"){
						console.log("false");
					}*/
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

	/*for (let i = 0; i<strict_test_params.length; i++){
		console.log("H:"+strict_test_params[i]);
		console.log(obj1[strict_test_params[i]] + "===" + obj2[strict_test_params[i]]);
	}
	console.log(" ------------- ");*/


	return true;
}

export function findDuplicatePeople(teis, loose_test_params, strict_test_params, maxEditDistance){
	let duplicates = [];
	loose_test_params = loose_test_params || ["First name", "Last name", "Date of birth", "Mothers maiden name"];
	strict_test_params = strict_test_params || ["Blood type"];
	let duplicate_indexes = []
	maxEditDistance = maxEditDistance || 2;
	if(isEmpty(teis)){
		console.log("passed empty teis");
		return [[]];
	}
	//teis.forEach((tei, i) => {
	let i, j;
	for(i = 0; i<teis.length; i++){
		let tei = teis[i];
		let tempDuplicates = []
		//teis.forEach((tempTei, j) => {
		for(j = 0; j<teis.length; j++){
			let tempTei = teis[j];
			if(i !== j && !contains(i, duplicate_indexes) && isDuplicate(tei, tempTei, loose_test_params,strict_test_params, maxEditDistance)){
				tempDuplicates.push(teis[j]);
				duplicate_indexes.push(j);
			}
		}//);
		if (!(isEmpty(tempDuplicates))){
			tempDuplicates.push(tei);
			duplicates.push(tempDuplicates);
		}
	}//);
	return duplicates;
}

export function getTip(){
	return "Remember to wash your hands";
}
