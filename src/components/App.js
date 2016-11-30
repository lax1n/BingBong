import React, { Component } from 'react';
import {getAllDataStores, getDataStore, createDataStore, updateDataStores} from '../actions/data_store_actions';
import {isEqual, includes} from 'lodash';

import '../styles/App.css';
import '../libs/bootstrap.min.css';

import TabBar from './shared/tab_bar.js';

class App extends Component {
    componentDidMount(){
        getAllDataStores().then((response) => {
            let update = false;
            let dataStores = [];
            // Handle case when no dataStores exist
            if(!(isEqual(response, {}))){
                dataStores = response;
                if(!(includes(dataStores, 'BingBong'))){
                    update = true;
                }
            }else{
                update = true;
            }

            if(update){
                //Data store doesn't exist, so let's PUT it out there! (pun intended)
                dataStores.push('BingBong');
                console.log('Data store doesn\'t exist, attempting to add it...')
                updateDataStores(dataStores).then((response) => {
                    console.log('Successfully added data store!');
                }).catch((e) => {
                    console.log('Failed to add data store!', e);
                });
            }else{
                console.log('Data store already exists, no need to create it!');
            }
        }).catch((e) => {
            console.log('Failed to fetch data stores!', e);
        });

        /* Ideal solution to the above problem:
        getDataStore().then((response) => {
            console.log('Data store already exists, no need to create it!');
        }).catch((e) => {
            // Handle case when data store doesn't already exist (status code 404)
            if(e.status === 404){
                console.log('Data store doesn\'t exist, attempting to create it...')
                createDataStore().then((response) => {
                    console.log('Successfully created data store!');
                }).catch((e) => {
                    console.log('Failed to create data store!', e);
                });
            }else{
                // Do nothing as of yet as we don't support all kinds of error messages,
                // could be a server fault at certain times where the dataStore actually exists already or something else.
            }
        });
        */
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
