import {getAllTEIsByOrganizationAndProgram} from '../actions/tei_actions';
//import {size} from 'lodash';

export function giveMeData(){
	return getAllTEIsByOrganizationAndProgram("DiszpKrYNg8", "ur1Edk5Oe2n").then((everything) => {
		var i;
		//var headers = [];
		var instances = [];
		console.log("everything: " + everything);
		console.log("everything.grid: " + everything.grid);
		console.log("everything.headers: " + everything.headers);
		console.log("everything.headers[0]: " + everything.headers[0]);
		console.log("everything.headers[0].name: " + everything.headers[0].name);
		var headerCount = everything.headers.length;
		var instanceCount = everything.rows.length;
		for (i = 0; i < instanceCount; i++) {
			for (i = 0; i < headerCount; i++) {
				eval("instances.push({"+everything.headers[i].column+":"+ everything.rows[i]+"})");
			}
		}
		return instances;
	}).catch((e) => {
		console.log('Error while loading everything', e.message);
	});
}
export function findPeopleWithTheSameName(){
	/*giveMeData().then((instances) => {
		console.log(instances);
		for (var i = 0; i < instances.length; i++) {
			/*instances.each(key, value){
				console.log("Hello");
			}*/
			/*instances.each((instance, i) => {
				console.log(instance);
				console.log(i);
			});
			console.log(instances[i].City)
			for (var key in instances[i]) {
				console.log("key: "+key);
			}
		}
	});*/
	return "WARNING! joke ahead--------------------------------------------------------------> (There is no joke)"
}
