import React, { Component } from 'react';
import GetTasks from './GetTasks';

import './App.css';

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			didStateChange: false,
			openPost: false,
			message: '',
			failed: false,
			show: false
		};
		this.toggleState = this.toggleState.bind(this);
		this.toggleOpenPost = this.toggleOpenPost.bind(this);
		this.postSuccess = this.postSuccess.bind(this);
		this.patchSuccess = this.patchSuccess.bind(this);
		this.postFailure = this.postFailure.bind(this);
		this.patchFailure = this.patchFailure.bind(this);
		this.deleteSuccess = this.deleteSuccess.bind(this);
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

	postSuccess() {
		this.setState({
			message: "Task is sucessfully posted.",
			failed: false
		})
		this.showMessage();
	}

	patchSuccess() {
		this.setState({
			message: "Task is sucessfully updated.",
			failed: false
		})
		this.showMessage();
	}

	postFailure() {
		this.setState({
			message: "Task failed to post. Check error in console.",
			failed: true
		})
		this.showMessage();
	}

	patchFailure() {
		this.setState({
			message: "Task failed to update. Check error in console.",
			failed: true
		})
		this.showMessage();
	}

	deleteSuccess() {
		this.setState({
			message: "Task has been deleted.",
			failed: false
		})
		this.showMessage();
	}

	showMessage() {
		this.setState({
			show: true
		});
		setTimeout(() => {
			this.setState({
				show: false
			});
		}, 5000);
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Task Scheduler</h1>
				</header>
				<div className="ResponseMessage">
					<div className={"message" + (this.state.failed ? ' failed' : '') + (this.state.show ? ' show' : '')}>
						{this.state.message}
					</div>
				</div>
				<GetTasks toggleState={this.toggleState}
						didStateChange={this.state.didStateChange}
						toggleOpenPost={this.toggleOpenPost} 
						openPost={this.state.openPost}
				  		postSuccess={this.postSuccess}
						patchSuccess={this.patchSuccess}
						postFailure={this.postFailure}
						patchFailure={this.patchFailure}
						deleteSuccess={this.deleteSuccess} />
				<footer className="App-footer">
					<div className="footer">
						Ian Ho made this. <br />
						More projects like this on <a href="https://github.com/ho-ian">github</a> or <a href="http://ianhoportfolio.com">my website.</a>
					</div>
				</footer>
			</div>
		);
	}
}

export default App;
