import {getAllSingletonsByOrganizationAndProgram, getAllSingletonsByOrganization} from '../actions/singleton_actions';
import {findDuplicates} from './find_duplicates';
import {parseSingletonQueryResults} from './singleton_parsers'

export function findSingletonDuplicatesByOrganizationAndProgram(orgUnit, program, myFilters){
	//Finds duplicates for a given orgUnit and program. Using myFilters
	myFilters = myFilters || [];
	return getAllSingletonsByOrganizationAndProgram(orgUnit, program).then((response) => {
		return parseSingletonQueryResults(response).then(function (some){
			let params = some[1];
			let singletons = some[0];
			myFilters.strictTestParams = params;
			myFilters.looseTestParams = [];
			console.log("finding duplicates...");
			return findDuplicates(singletons, myFilters);
		});
	});
}
export function findSingletonDuplicatesByOrganization(orgUnit, myFilters){
	//Finds duplicates for a given orgUnit. Using myFilters
	myFilters = myFilters || [];
	return getAllSingletonsByOrganization(orgUnit).then((response) => {
		return parseSingletonQueryResults(response).then(function (some){
			let params = some[1];
			let singletons = some[0];
			myFilters.strictTestParams = params;
			myFilters.looseTestParams = [];
			console.log("finding duplicates...");
			return findDuplicates(singletons, myFilters);
		});
	});
}
