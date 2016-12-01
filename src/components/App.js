import React, { Component } from 'react';
import {getDataStore, createDataStoreKey} from '../actions/data_store_actions';
//import {isEqual, includes} from 'lodash';

import '../styles/App.css';
import '../libs/bootstrap.min.css';

import TabBar from './shared/tab_bar.js';

class App extends Component {
    componentDidMount(){
        getDataStore().then((response) => {
            console.log('Data store already exists, no need to create it!');
        }).catch((e) => {
            // Handle case when data store doesn't already exist (status code 404)
            if(e.status === 404){
                // Let's try to initialize the data store because unfortunately the API doesn't allow us to create it and initialize it with a single action!
				const entries = ['tei_favs', 'tei_recents', 'teis_duplicates', 'singleton_favs', 'singleton_recents', 'singletons_duplicates'];
				entries.map((entry) => {
					createDataStoreKey(entry, []).then((response) => {
						console.log('Successfully created ' + entry + ' in data store.');
					}).catch((e) => {
						console.log('Failed to create ' + entry + ' in data store.');
					});
				});
            }else{
                // Do nothing as of yet as we don't support all kinds of error messages,
                // could be a server fault at certain times where the dataStore actually exists already or something else.
            }
        });
    }

	render() {
		console.log("Render called in App.js")
		return (
  		    <div className='container-fluid'>
              <TabBar />
  		  </div>
		);
	}
}

export default App;
