import {getAllTEIsByOrganizationAndProgram, getAllTEIsByOrganization} from '../actions/tei_actions';
import {findDuplicatePeople} from './find_duplicates';
import {parseQueryResultsOrgOnly, parseQueryResults} from './tei_parsers'

export function findTEIDuplicatesByOrganizationAndProgram(orgUnit, program){
	return getAllTEIsByOrganizationAndProgram(orgUnit, program).then((response) => {
		const teis = parseQueryResults(response);
		const duplicates = findDuplicatePeople(teis);
		return duplicates;
	});
}
export function findTEIDuplicatesByOrganization(orgUnit){
	return getAllTEIsByOrganization(orgUnit).then((response) => {
		const teis = parseQueryResultsOrgOnly(response);
		const duplicates = findDuplicatePeople(teis);
		return duplicates;
	});
}
