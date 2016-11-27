import React, { Component } from 'react';
import {Button, ButtonGroup} from 'react-bootstrap';
import ShowPrevious from './show_previous.js';


class SelectPrevious extends Component{
	constructor(props){
		super(props);

		this.state = {
			recentSelected: false,
			favSelected: false,
		}

		this.showRecents=this.showRecents.bind(this);
		this.showFavs=this.showFavs.bind(this);
	}

	toggle(type){
		if(type === 'recent'){
			this.setState({recentSelected: !this.state.recentSelected});
		}else if(type === 'fav'){
			this.setState({favSelected: !this.state.favSelected});
		}
	}

	showRecents(){
		if(this.state.recentSelected){
			this.setState({recentSelected: false});
		} else{
			this.setState({recentSelected: true});
		}
	}

	showFavs(){
		if(this.state.favSelected){
			this.setState({favSelected: false});
		} else {
			this.setState({favSelected: true});
		}
	}

	render(){
		let prev ='';
		let fav = '';
		if(this.state.recentSelected){
			prev = <ShowPrevious sm={6} queries={this.props.recents} findResults={this.props.findResults} />;
		}
		if(this.state.favSelected){
			fav = <ShowPrevious sm={6} queries={this.props.favourites} findResults={this.props.findResults} />;
		}
		return(

			<ButtonGroup>
                <Button
	                bsStyle='primary'
	                onClick={this.showRecents}
                > {this.state.recentSelected} Recent Queries
                </Button>
                <Button
	                bsStyle='info'
	                onClick={this.showFavs}
                > {this.state.favSelected} Favourite Queries
                </Button>
                {prev}
                {fav}
			</ButtonGroup>
		);
	}
}

export default SelectPrevious;
