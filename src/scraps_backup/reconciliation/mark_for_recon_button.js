import React, { Component } from 'react';
import saveThings from "../../actions/save_things"
import {Button} from 'react-bootstrap';

class MarkForReconButton extends Component {
	constructor(props){
        super(props);

    }
	markForRecon(duplicates){//These duplicates have been confirmed by an admin.
		console.log(duplicates);
		//saveThings('markedForReconciliation', JSON.stringify(duplicates));
		//saveThings('markedForReconciliation', duplicates);
	}
    render(){
        return (
			<Button
				bsStyle='default'
				onClick={this.markForRecon.bind(this, [
					[
						{'First name': 'Bingg', 'Last Name': 'Bong', 'Something': 'Bing1'},
						{'First name': 'Bing', 'Last Name': 'Bong', 'Something': 'Bing3'},
						{'First name': 'Bing', 'Last Name': 'Boong', 'Something': 'Bing4'},
						{'First name': 'Bing', 'Last Name': 'Bnog', 'Something': 'Bing2'},
					]
				])}
			>
			Mark for reconciliation.
			</Button>
        );
    }
}
export default MarkForReconButton;
