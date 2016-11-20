import React, { Component } from 'react';
import {Well, Button, Row, Col, Table} from 'react-bootstrap';
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

	showRecents(){
		this.setState({recentSelected: true,});
	}

	showFavs(){
		this.setState({favSelected: true,});
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

			<div>
			    <Well>
                    <Row>
                        <Col sm={6}>
                        <Button  
                        bsStyle='primary'
                        onClick={this.showRecents}
                        >
                            Show Recent Queries
                        </Button>
                        {prev}
                        </Col>
                        <Col sm={6}>
                        <Button 
                        bsStyle='info'
                        onClick={this.showFavs}
                        >
                            Show Favourite Queries
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