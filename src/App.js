import React, { Component } from 'react';

// styles
// import './styles/basics.css';
import './styles/app.css';

// state management provider
import { GlobalProvider as Provider } from './state-manager/globalState.js';


// require components
import LeftSide from './components/left-side/LeftSide';
import RighttSide from './components/right-side/RightSide';


class App extends Component {
	render() {
		return (
			<Provider>
				<div className="app">
					<LeftSide />
					<RighttSide />
				</div>
			</Provider>

		);
	}
}

export default App;
