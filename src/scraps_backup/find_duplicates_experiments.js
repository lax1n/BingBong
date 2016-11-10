
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

export function findSimiliraities(){
	var similarites = {};
	giveMeData().then((teis) => {
		for (var category in teis[0]) {
			similarites[category] = {};
			for (var i = 0; i < teis.length; i++) {
				for (var j = 0; j < teis.length; j++) {
					if(i !== j && teis[i][category] === teis[j][category] && teis[j][category] !== ""){
						if(similarites[category][teis[i][category]] == undefined){
							similarites[category][teis[i][category]] = [];
						}
						similarites[category][teis[i][category]].push(teis[i]);
					}
				}
			}
			//console.log("similarites[category]");
			//console.log(similarites[category]);
		}
		console.log(similarites);
	});
	return "No joke";

}
export function niceOverview(){
	var similarites = {};
	giveMeData().then((teis) => {
		for (var category in teis[0]) {
			similarites[category] = {};
			for (var i = 0; i < teis.length; i++) {
				if(teis[i][category] !== ""){
					if(similarites[category][teis[i][category]] == undefined){
						similarites[category][teis[i][category]] = [];
					}
					similarites[category][teis[i][category]].push(teis[i]);
				}
			}
			//console.log("similarites[category]");
			//console.log(similarites[category]);
		}
		console.log(similarites);
	});
	return "No joke";

}
export function getJoke(){
	var joke = "(there is no joke)"
	return getNorrisJoke().then((value) => {
		joke = value.joke;
		//Jokes only exist in the log for now
		console.log("Joke: " + joke)
		return joke;
	}).catch((e) => {
		console.log('Error while loading joke', e.message);
	});
	return "WARNING! joke ahead--------------------------------------------------------------> " + joke;

}
