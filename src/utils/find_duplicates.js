import {contains} from './contains';
import {isDuplicate} from './isDuplicate'
//import {getNorrisJoke} from '../actions/norris_actions';

import {isEmpty} from 'lodash';

export function findDuplicatePeople(teis, loose_test_params, strict_test_params, maxEditDistance, maxUndefinedCount){
	let duplicates = [];
	let duplicate_indexes = []
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
