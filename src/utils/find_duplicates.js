import {getAllTEIsByOrganizationAndProgram} from '../actions/tei_actions';
import {getNorrisJoke} from '../actions/norris_actions';
//import {size} from 'lodash';

export function giveMeData(){
	return getAllTEIsByOrganizationAndProgram("DiszpKrYNg8", "ur1Edk5Oe2n").then((everything) => {
		var i, j;
		//var headers = [];
		var instances = [];
		/*console.log("everything: " + everything);
		console.log("everything.grid: " + everything.grid);
		console.log("everything.headers: " + everything.headers);
		console.log("everything.headers[0]: " + everything.headers[0]);
		console.log("everything.headers[0].name: " + everything.headers[0].name);*/
		var headerCount = everything.headers.length;
		var instanceCount = everything.rows.length;
		for (i = 0; i < instanceCount; i++) {
			for (j = 0; j < headerCount; j++) {
				//console.log('instances.push({"'+everything.headers[j].column+'":"'+ everything.rows[i][j]+'"})');
				eval('instances.push({"'+everything.headers[j].column+'":"'+ everything.rows[i][j]+'"})');
			}
		}
		return instances;
	}).catch((e) => {
		console.log('Error while loading everything', e.message);
		return -1;
	});
}
export function findPeopleWithTheSameName(){
	var joke = "(there is no joke)"
	giveMeData().then((instances) => {
		for (var i = 0; i < instances.length; i++) {
			/*instances.each(key, value){
				console.log("Hello");
			}*/
			/*instances.each((instance, i) => {
				console.log(instance);
				console.log(i);
			});*/
			//console.log("Here:");
			//console.log(instances[i].City)
			for (var key in instances[i]) {
				//console.log("key: "+key+" values: "+instances[i][key])
			}
		}
	});
	getNorrisJoke().then((value) => {
		joke = value.joke;
		//Jokes only exist in the log for now
		console.log("Joke: " + joke)
	}).catch((e) => {
		console.log('Error while loading joke', e.message);
	});
	return "WARNING! joke ahead--------------------------------------------------------------> " + joke;

}
