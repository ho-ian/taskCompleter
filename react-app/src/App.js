import React, { Component } from 'react';
import logo from './logo.svg';
import Task from './Task';
import PostTask from './PostTask';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: []
		};
		this.render = this.render.bind(this);
	}

	callAPI = async() => {
		const res = await fetch('/tasks');
		const body = await res.json();

		if (res.status !== 200) {
			throw Error(body.message);
		}
		return body;
	};
  
	componentDidMount() {
		this.callAPI()
		.then(res => this.setState({ data : res }))
		.catch(err => console.log(err));
	}

	render() {

		const tasks = this.state.data.map((task, key) =>
			<Task refresh={this.render} task={task} key={task.title}/>
		);


		return (
			<div>
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<h1 className="App-title">Welcome to React</h1>
				</header>
				<p>{tasks}</p>
				<PostTask refresh={this.render}/>
			</div>
		);
	}
}

export default App;
