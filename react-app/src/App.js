import React, { Component } from 'react';
import GetTasks from './GetTasks';
import PostTask from './PostTask';
import './App.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			didStateChange: false
		};
		this.toggleState = this.toggleState.bind(this);
	}

	toggleState() {
		this.setState({
			didStateChange: !this.state.didStateChange
		});
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">List of Tasks</h1>
				</header>
				<GetTasks toggleState={this.toggleState} didStateChange={this.state.didStateChange}/>
				<PostTask toggleState={this.toggleState}/>
			</div>
		);
	}
}

export default App;
