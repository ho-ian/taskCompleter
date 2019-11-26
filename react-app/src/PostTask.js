import React, { Component } from 'react';
import cuid from 'cuid';

class PostTask extends Component {
	constructor(props) {
		super(props);
		this.state = {
			author: '',
			taskId: cuid(),
			title: '',
			description: '',
			date: '',
			start: '',
			end:''
		}
	}

	handleSubmit = async() => {
		const response = await fetch('/tasks', {
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this.state)
		});
		const body = await response.json();

		console.log(body);
	}
	
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	reset = () => {
		this.setState({
			author: '',
			taskId: cuid(),
			title: '',
			description: '',
			date: '',
			start: '',
			end:''
		});
	}

	render() {
		return (
			<div className="PostTask">
				<div class="panel panel-primary">
				<div class="panel panel-heading">Post a new Task</div>
					<div class="panel panel-body">
						<strong>Author:</strong> <br /> <input type="text" name="author" value={this.state.author} onChange={this.handleChange} /> <br />
						<strong>title:</strong> <br /> <input type="text" name="title" value={this.state.title} onChange={this.handleChange} /> <br />
						<strong>description:</strong> <br /> <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/> <br />
						<strong>date:</strong> <br /> <input type="text" name="date" value={this.state.date} onChange={this.handleChange} /> <br /><br />
						<strong>start:</strong> <br /> <input type="text" name="start" value={this.state.start} onChange={this.handleChange} /> <br /><br />
						<strong>end:</strong> <br /> <input type="text" name="end" value={this.state.end} onChange={this.handleChange} /> <br /><br />
						<button class="btn btn-primary" onClick={() => {this.handleSubmit(); this.reset();}}>Post Task</button>
					</div>
				</div>
			</div>
		);
	}

}

export default PostTask;