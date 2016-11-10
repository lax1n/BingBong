import React, { Component } from 'react';

class Duplicates extends Component {
    constructor(props){
        super(props);
    }

	render(){
        const duplicates = this.props.duplicates;
        if(duplicates === []){
            return (
                <div className='row'>
                    <div className='col-sm-12'>
                        <p>No duplicates found.</p>
                    </div>
                </div>
            )
        }
		return(
			<div className='row'>
                <div className='col-sm-12'>
                    {duplicates.map((duplicateRow, i) => {
                        return (
                            <div className='row' key={i}>
                                {duplicateRow.map((duplicate, j) => {
                                    return (
                                        <p key={j}>{duplicate["First name"]}</p>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
			</div>
		);
	}

}

export default Duplicates;
