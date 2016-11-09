import {getAllTEIsByOrganizationAndProgram} from '../actions/tei_actions';
//import {size} from 'lodash';

export function giveMeData(){
	return getAllTEIsByOrganizationAndProgram("DiszpKrYNg8", "ur1Edk5Oe2n").then((everything) => {
		var i;
		var headers = [];
		var instances = [];
		console.log("everything: " + everything);
		console.log("everything.grid: " + everything.grid);
		console.log("everything.headers: " + everything.headers);
		console.log("everything.headers[0]: " + everything.headers[0]);
		console.log("everything.headers[0].name: " + everything.headers[0].name);
		var headerCount = everything.headers.length;
		for (i = 0; i < headerCount; i++) {
			//console.log(everything.headers[i].column);
			headers.push(everything.headers[i].column)
			//console.log(headers);
		}
		var instanceCount = everything.rows.length;
		for (i = 0; i < instanceCount; i++) {
			instances.push(everything.rows[i])
			//console.log(instances[i]);
		}
		console.log(headers);
		console.log(instances);
		return [headers, instances];
	}).catch((e) => {
		console.log('Error while loading everything', e.message);
	});
}
export function findPeopleWithTheSameName(){
	giveMeData().then((everything) => {
		var headers = everything[0];
		var instances = everything[1];
		var firstNameSet = new Set();
		var lastNameSet = new Set();
		for(var i= 0; i < headers.length; i++){
			if(headers[i] === "First name"){
				for(var j = 0; j<instances.length; j++){
					//console.log("name: " + instances[j][i]);
					if(firstNameSet.has(instances[j][i])){
						console.log("common firstname: " + instances[j][i])
					}
					firstNameSet.add(instances[j][i])
				}
			}
			else if(headers[i] === "Last name"){
				for(var j = 0; j<instances.length; j++){
					//console.log("name: " + instances[j][i]);
					if(lastNameSet.has(instances[j][i])){
						console.log("common lastname: " + instances[j][i])
					}
					lastNameSet.add(instances[j][i])
				}
			}
		}
	});
	return "HEllo this doesn't return much"
}
