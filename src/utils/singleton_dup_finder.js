import {getAllSingletonsByOrganizationAndProgram, getAllSingletonsByOrganization} from '../actions/singleton_actions';
import {findDuplicatePeople} from './find_duplicates';
import {parseSingletonQueryResults} from './singleton_parsers'

export function findSingletonDuplicatesByOrganizationAndProgram(orgUnit, program){
	return getAllSingletonsByOrganizationAndProgram(orgUnit, program).then((response) => {
		let singletons = parseSingletonQueryResults(response);
		let params = singletons[1];
		singletons = singletons[0];
		const duplicates = findDuplicatePeople(singletons, undefined,  params);
		return duplicates;
		//return response;
	});
}
export function findSingletonDuplicatesByOrganization(orgUnit){
	return getAllSingletonsByOrganization(orgUnit).then((response) => {
		let singletons = parseSingletonQueryResults(response);
		let params = singletons[1];
		singletons = singletons[0];
		const duplicates = findDuplicatePeople(singletons, undefined,  params);
		return duplicates;
	});
}
