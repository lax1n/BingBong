import {contains} from './contains';
import {isDuplicate} from './isDuplicate'
//import {getNorrisJoke} from '../actions/norris_actions';
import Moment from 'moment';

import {isEmpty} from 'lodash';

export function findDuplicates(teis, myFilters){
	let duplicates = [];
	let duplicate_indexes = []
	if(isEmpty(teis)){
		console.log("No teis passed");
		return undefined;//[[{}]];
	}
	let startDate, endDate;
	if(myFilters.startDate !== ""){
		console.log("Will be checking with startDate");
		startDate = Moment(myFilters.startDate);
	}
	if(myFilters.endDate !== ""){
		console.log("Will be checking with endDate");
		endDate = Moment(myFilters.endDate);
	}
	//teis.forEach((tei, i) => {
	let i, j;
	for(i = 0; i<teis.length; i++){
		let tei = teis[i];
		let tempDuplicates = [];
		//Checks if it is too early
		if(myFilters.startDate !== ""){if(Moment(tei.created).isBefore(startDate)){continue;}}
		//Checks if it is too late
		if(myFilters.endDate !== ""){if(endDate.isBefore(Moment(tei.created))){continue;}}
		for(j = 0; j<teis.length; j++){
			let tempTei = teis[j];
			//Checks if it is too early
			if(myFilters.startDate !== ""){ if(Moment(tempTei.created).isBefore(startDate)){continue;}}
			//Checks if it is too late
			if(myFilters.endDate !== ""){if(endDate.isBefore(Moment(tempTei.created))){continue;}}
			if(i !== j && !contains(i, duplicate_indexes) && isDuplicate(tei, tempTei, myFilters)){
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
