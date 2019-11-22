import React, { Component } from 'react';
import './App.css';

function getTaskInfo(task) {
	var taskInfo = [task.author, task.title, task.description, task.date, task.start, task.end].join("<+>");
	return taskInfo;
}

class App extends Component {
	state = {
		data: [],
		id: ''
	};
  
	componentDidMount() {
		fetch('/tasks')
		.then(res => res.json())
		.then(json => this.setState({ data: json , id: json.id}))
		.catch(err => console.log(err));
	}

	render() {

		return (
			<div>
				<p>{this.state.data.map(getTaskInfo)}</p>
			</div>
		);
	}
}

export default App;
