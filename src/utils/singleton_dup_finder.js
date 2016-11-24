import {getAllSingletonsByOrganizationAndProgram, getAllSingletonsByOrganization} from '../actions/singleton_actions';
import {findDuplicatePeople} from './find_duplicates';
import {parseSingletonQueryResults} from './singleton_parsers'

export function findSingletonDuplicatesByOrganizationAndProgram(orgUnit, program, myFilters){
	myFilters = myFilters || [];
	return getAllSingletonsByOrganizationAndProgram(orgUnit, program).then((response) => {
		return parseSingletonQueryResults(response).then(function (some){
			let params = some[1];
			let singletons = some[0];
			return findDuplicatePeople(singletons, [],  params, myFilters.maxEditDistance, myFilters.maxUndefinedCount, myFilters.timeTestParams);
		});
	});
}
export function findSingletonDuplicatesByOrganization(orgUnit, myFilters){
	myFilters = myFilters || [];
	return getAllSingletonsByOrganization(orgUnit).then((response) => {
		return parseSingletonQueryResults(response).then(function (some){
			let params = some[1];
			let singletons = some[0];
			return findDuplicatePeople(singletons, [],  params, myFilters.maxEditDistance, myFilters.maxUndefinedCount, myFilters.timeTestParams);
		});
	});
}

//XXX Remember to ignore the ones that have too few fields. Maybe add another optional argument
