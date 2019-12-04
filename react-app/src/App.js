import React, { Component } from 'react';
import GetTasks from './GetTasks';

import './App.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			didStateChange: false,
			openPost: false
		};
		this.toggleState = this.toggleState.bind(this);
		this.toggleOpenPost = this.toggleOpenPost.bind(this);
	}

	toggleState() {
		this.setState({
			didStateChange: !this.state.didStateChange
		});
	}

	toggleOpenPost() {
		this.setState({
			openPost: !this.state.openPost
		});
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Task Scheduler</h1>
				</header>
				<GetTasks toggleState={this.toggleState} didStateChange={this.state.didStateChange} toggleOpenPost={this.toggleOpenPost} openPost={this.state.openPost}/>
			</div>
		);
	}
}

export default App;
