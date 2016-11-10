import {getAllTEIsByOrganizationAndProgram} from '../actions/tei_actions';
import {getNorrisJoke} from '../actions/norris_actions';
//import {size} from 'lodash';

export function giveMeData(){
	return getAllTEIsByOrganizationAndProgram("DiszpKrYNg8", "ur1Edk5Oe2n").then((everything) => {
		var i, j;
		var instances = [];
		var headerCount = everything.headers.length;
		var instanceCount = everything.rows.length;
		for (i = 0; i < instanceCount; i++) {
			instances[i] = {};
			for (j = 0; j < headerCount; j++) {
				eval('instances['+i+']["'+everything.headers[j].column+'"] = "'+ everything.rows[i][j]+'"');
			}
		}
		return instances;
	}).catch((e) => {
		console.log('Error while loading everything', e.message);
		return -1;
	});
}
// This function does not take empty values into account, e.g last name "" will be evaluated as a duplicate if both are empty.
export function isDuplicate(obj1, obj2){
	/*
	const attributes = {
		"Instance": false,
		"First name": true,
		"Last name": true,
		"Date of birth": true,
	}
	*/
	return (
		(obj1["Instance"] !== obj2["Instance"]) &&
		(obj1["First name"] === obj2["First name"]) &&
		(obj1["Last name"] === obj2["Last name"]) &&
		(obj1["Date of birth"] === obj2["Date of birth"])
	)
}

export function findDuplicatePeople(){
	giveMeData().then((teis) => {
		let duplicates = [[]];
		teis.forEach((tei, i) => {
			teis.forEach((tempTei, j) => {
				if(isDuplicate(tei, tempTei)){
					console.log("Possible duplicate found:");
					console.log(tei);
					console.log(tempTei);
				}
			});
		});
	});
}

export function testFunction(){
	var joke = "(there is no joke)"
	giveMeData().then((instances) => {
		for (var i = 0; i < instances.length; i++) {
			//console.log("Here:");
			//console.log(instances[i])
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

export function sameFirstName(){
	var duplicates = {};
	giveMeData().then((teis) => {
		for (var i = 0; i < teis.length; i++) {
			for (var j = 0; j < teis.length; j++) {
				if(i !== j && teis[i]["First name"] === teis[j]["First name"]){
					if(duplicates[teis[i]["First name"]] == undefined){
						duplicates[teis[i]["First name"]] = [];
					}
					duplicates[teis[i]["First name"]].push(teis[i]);

				}
			}
		}
		console.log("duplicates");
		console.log(duplicates);
	});
	return "WARNING! joke ahead--------------------------------------------------------------> ";

}
