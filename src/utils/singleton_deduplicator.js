import {getAllSingletonsByOrganizationAndProgram, getAllSingletonsByOrganization} from '../actions/singleton_actions';
import {findDuplicatePeople} from './find_duplicates';
import {parseSingletonQueryResults} from './singleton_parsers'

export function findSingletonDuplicatesByOrganizationAndProgram(orgUnit, program){
	return getAllSingletonsByOrganizationAndProgram(orgUnit, program).then((response) => {
		let singletons,  categories
		[singletons, categories] = parseSingletonQueryResults(response);
		//XXX We need to transform the categories here so that the can be passed properly
		const duplicates = findDuplicatePeople(singletons, ["oZg33kd9taw", "a3kGcGDCuk6", "UXz7xuGCEhU"],  ["Blood type"]);
		return duplicates;
		//return response;
	});
}
export function findSingletonDuplicatesByOrganization(orgUnit){
	return getAllSingletonsByOrganization(orgUnit).then((response) => {
		let singletons,  categories
		[singletons, categories] = parseSingletonQueryResults(response);
		const duplicates = findDuplicatePeople(singletons, ["oZg33kd9taw", "a3kGcGDCuk6", "UXz7xuGCEhU"],  ["Blood type"]);
		return duplicates;
	});
}
