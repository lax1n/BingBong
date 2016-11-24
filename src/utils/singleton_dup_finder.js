import {getAllSingletonsByOrganizationAndProgram, getAllSingletonsByOrganization} from '../actions/singleton_actions';
import {findDuplicatePeople} from './find_duplicates';
import {parseSingletonQueryResults} from './singleton_parsers'

export function findSingletonDuplicatesByOrganizationAndProgram(orgUnit, program){
	return getAllSingletonsByOrganizationAndProgram(orgUnit, program).then((response) => {
		return parseSingletonQueryResults(response).then(function (some){
			let params = some[1];
			let singletons = some[0];
			return findDuplicatePeople(singletons, undefined,  params);
		});
	});
}
export function findSingletonDuplicatesByOrganization(orgUnit){
	return getAllSingletonsByOrganization(orgUnit).then((response) => {
		return parseSingletonQueryResults(response).then(function (some){
			let params = some[1];
			let singletons = some[0];
			return findDuplicatePeople(singletons, undefined,  params);
			//return duplicates;
		});
	});
}

//XXX Remember to ignore the ones that have too few fields. Maybe add another optional argument
