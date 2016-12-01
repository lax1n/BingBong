import React, { Component } from 'react';
import bong from '../../images/bingbong.jpg';

class About extends Component {

	render(){
		return(
			<div className='text-center'>
				<br />
                <p><b>The deduplicator</b> is for gathering elements that are duplicates, with certain misspellings and such, and offering the user an option to mark them to be reconciled</p>
                <p>Use <i>Tracked Entity Instances</i> to gather duplicates of TEIs </p>
                <p>Use <i>Singletons</i> to gather duplicates of single events that are not associated with persons</p>
                <br />
                <p>Created by IFI group BingBong; August Haug Hem, Mahasty Assi, Åvald Åslaugson Sommervoll</p>
                <img src={bong} className="Img-size" />
			</div>
		);
	}

}

export default About;
