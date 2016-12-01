import {contains} from './contains';
import {isDuplicate} from './is_duplicate'
//import {getNorrisJoke} from '../actions/norris_actions';
import Moment from 'moment';

import {isEmpty} from 'lodash';

export function findDuplicates(instances, myFilters){
	/*This funciton loops through all the given instances, then compares them with each other using the imported funciton isDuplicate.
	 *Then finally it returns an array, where the elements are arrays of the instances that may be duplicates of each other.
	 */
	let duplicates = [];
	let duplicate_indexes = []
	if(isEmpty(instances)){
		console.log("No instances passed");
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
	//instances.forEach((instance, i) => {
	let i, j;
	for(i = 0; i<instances.length; i++){
		let instance = instances[i];
		let tempDuplicates = [];
		//Checks if it is too early
		if(myFilters.startDate !== ""){if(Moment(instance.created).isBefore(startDate)){continue;}}
		//Checks if it is too late
		if(myFilters.endDate !== ""){if(endDate.isBefore(Moment(instance.created))){continue;}}
		for(j = 0; j<instances.length; j++){
			let tempInstance = instances[j];
			//Checks if it is too early
			if(myFilters.startDate !== ""){ if(Moment(tempInstance.created).isBefore(startDate)){continue;}}
			//Checks if it is too late
			if(myFilters.endDate !== ""){if(endDate.isBefore(Moment(tempInstance.created))){continue;}}
			if(i !== j && !contains(i, duplicate_indexes) && isDuplicate(instance, tempInstance, myFilters)){
				tempDuplicates.push(instances[j]);
				duplicate_indexes.push(j);
			}
		}//);
		if (!(isEmpty(tempDuplicates))){
			tempDuplicates.push(instance);
			duplicates.push(tempDuplicates);
		}
	}//);
	if(isEmpty(duplicates)){
		console.log("No duplicates found");
		return undefined;//[[{}]];
	}
	return duplicates;
}
