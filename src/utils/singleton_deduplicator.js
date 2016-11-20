import {getAllSingletonsByOrganizationAndProgram, getAllSingletonsByOrganization} from '../actions/singleton_actions';

export function findSingletonDuplicatesByOrganizationAndProgram(orgUnit, program){
	return getAllSingletonsByOrganizationAndProgram(orgUnit, program).then((response) => {
		//const singletons = parseQueryResults(response);
		//const duplicates = findDuplicatePeople(singletons);
		//return duplicates;
		return response;
	});
}
export function findSingletonDuplicatesByOrganization(orgUnit){
	return getAllSingletonsByOrganization(orgUnit).then((response) => {
		//const singletons = parseQueryResultsOrgOnly(response);
		//const duplicates = findDuplicatePeople(singletons);
		//return duplicates;
		return response;
	});
}
