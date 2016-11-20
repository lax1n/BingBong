import React, { Component } from 'react';
import {Well, Button, Row, Col} from 'react-bootstrap';
import ShowPrevious from './show_previous.js';


class SelectPrevious extends Component{
	constructor(props){
		super(props);

		this.state = {
			recentSelected: "Show",
			favSelected: "Show",
		}

		this.showRecents=this.showRecents.bind(this);
		this.showFavs=this.showFavs.bind(this);
	}

	showRecents(){
		if(this.state.recentSelected == "Hide"){
			this.setState({recentSelected: "Show", });
		} else{
			this.setState({recentSelected: "Hide", });
		}
	}

	showFavs(){
		if(this.state.favSelected == "Hide"){
			this.setState({favSelected: "Show", });
		} else {
			this.setState({favSelected: "Hide", });
		}
	}

	render(){
		let prev ='';
		let fav = '';
		if(this.state.recentSelected == "Hide"){
			prev = <ShowPrevious sm={6} queries={this.props.recents} findResults={this.props.findResults} />;
		}
		if(this.state.favSelected == "Hide"){
			fav = <ShowPrevious sm={6} queries={this.props.favourites} findResults={this.props.findResults} />;
		}
		return(

			<div>
			    <Well>
                    <Row>
                        <Col sm={6}>
                        <Button  
                        bsStyle='primary'
                        onClick={this.showRecents}
                        >
                          {this.state.recentSelected} Recent Queries
                        </Button>
                        {prev}
                        </Col>
                        <Col sm={6}>
                        <Button 
                        bsStyle='info'
                        onClick={this.showFavs}
                        >
                          {this.state.favSelected} Favourite Queries
                        </Button>
                        {fav}
                        </Col>
                    </Row>

                </Well>
			</div>
		);
	}
}

export default SelectPrevious;