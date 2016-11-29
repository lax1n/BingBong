import {getAllTEIsByOrganizationAndProgram, getAllTEIsByOrganization} from '../actions/tei_actions';
import {findDuplicates} from './find_duplicates';
import {parseQueryResults} from './tei_parsers'

export function findTEIDuplicatesByOrganizationAndProgram(orgUnit, program, filters){
	filters = filters || [];
	return getAllTEIsByOrganizationAndProgram(orgUnit, program).then((response) => {
		const teis = parseQueryResults(response);
		const duplicates = findDuplicates(teis, filters);
		return duplicates;
	});
}
export function findTEIDuplicatesByOrganization(orgUnit, filters){
	filters = filters || [];
	return getAllTEIsByOrganization(orgUnit).then((response) => {
		const teis = parseQueryResults(response);
		const duplicates = findDuplicates(teis, filters);
		return duplicates;
	});
}
