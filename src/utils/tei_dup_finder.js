import {getAllTEIsByOrganizationAndProgram, getAllTEIsByOrganization} from '../actions/tei_actions';
import {findDuplicates} from './find_duplicates';
import {parseQueryResultsOrgOnly, parseQueryResults} from './tei_parsers'

export function findTEIDuplicatesByOrganizationAndProgram(orgUnit, program, myFilters){
	myFilters = myFilters || [];
	return getAllTEIsByOrganizationAndProgram(orgUnit, program).then((response) => {
		const teis = parseQueryResults(response);
		const duplicates = findDuplicates(teis, myFilters);
		return duplicates;
	});
}
export function findTEIDuplicatesByOrganization(orgUnit, myFilters){
	myFilters = myFilters || [];
	return getAllTEIsByOrganization(orgUnit).then((response) => {
		const teis = parseQueryResultsOrgOnly(response);
		const duplicates = findDuplicates(teis, myFilters);
		return duplicates;
	});
}
