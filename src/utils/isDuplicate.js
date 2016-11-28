import {isEmpty} from 'lodash';
import {getEditDistance} from '../libs/levenshtein';
import Moment from 'moment';
export function isDuplicate(obj1, obj2, myFilters){
	myFilters.maxUndefinedCount = myFilters.maxUndefinedCount || 0;
	if(isEmpty(obj1) || isEmpty(obj2)){
		return false;
	}
	if(myStrictCheck(obj1, obj2, myFilters.strictTestParams, myFilters.maxUndefinedCount) === false){
		return false;
	}
	if(myLooseCheck(obj1, obj2, myFilters.looseTestParams, myFilters.maxEditDistance, myFilters.maxUndefinedCount) === false){
		return false;
	}
	if(myTimeCheck(obj1, obj2, myFilters.timeTestParams, myFilters.maxUndefinedCount) === false){
		return false;
	}

	return true;
}

function myLooseCheck(obj1, obj2, loose_test_params,maxEditDistance, max_undefined_count){
	//This returns true if the objects passed, are equal, within a certain edit distance
	let undefined_count = 0;//This counts the amount of instances where one of the objects is undefined while the other one isn't
	let editDistance;
	for (let i = 0; i<loose_test_params.length; i++){ //Looping over all the relevant parameters
		if((obj1[loose_test_params[i]] !== "") && (obj1[loose_test_params[i]] !== undefined)){
			undefined_count += 1;
			if((obj2[loose_test_params[i]] !== "")  && (obj2[loose_test_params[i]] !== undefined)){
				undefined_count -= 1;
				if(obj1[loose_test_params[i]].toUpperCase() !== obj2[loose_test_params[i]].toUpperCase()){ //Checking if they are equal
					editDistance = getEditDistance(obj1[loose_test_params[i]].toUpperCase(), obj2[loose_test_params[i]].toUpperCase()); //Calculating the editDistance
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
	if(undefined_count > max_undefined_count){
		return false;
	}
	return true;
}
function myStrictCheck(obj1, obj2, strict_test_params, max_undefined_count){
	let undefined_count = 0;//This counts the amount of instances where one of the objects is undefined while the other one isn't
	for (let i = 0; i<strict_test_params.length; i++){ //Looping over all the relevant parameters
		if((obj1[strict_test_params[i]] !== "") && (obj1[strict_test_params[i]] !== undefined)){
			undefined_count += 1;
			if((obj2[strict_test_params[i]] !== "")  && (obj2[strict_test_params[i]] !== undefined)){
				undefined_count -= 1;
				if(obj1[strict_test_params[i]].toUpperCase() !== obj2[strict_test_params[i]].toUpperCase()){ //Checking if they are equal
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
function myTimeCheck(obj1, obj2, timeTestParams, max_undefined_count){
	let undefined_count = 0;
	for (let i = 0; i<timeTestParams.length; i++){ //Looping over all the relevant parameters
		if((obj1[timeTestParams[i]] !== "") && (obj1[timeTestParams[i]] !== undefined)){
			undefined_count += 1;
			if((obj2[timeTestParams[i]] !== "")  && (obj2[timeTestParams[i]] !== undefined)){
				undefined_count -= 1;
				if(Moment(obj1[timeTestParams[i]]).isSame(Moment(obj2[timeTestParams[i]]), "day") === false){
					return false;
				}
			}
		}
		else if((obj2[timeTestParams[i]] !== "")  && (obj2[timeTestParams[i]] !== undefined)){
			undefined_count += 1;
		}
	}
	if(undefined_count > max_undefined_count){
		return false;
	}
	return true;
}
