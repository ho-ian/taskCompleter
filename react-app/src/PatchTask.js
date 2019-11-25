import React, { Component } from 'react';

class PatchTask extends Component {
	constructor(props){
		super(props);
		this.state = {
			author: this.props.author,
			title: this.props.title,
			description: this.props.description,
			date: this.props.date,
			start: this.props.start,
			end: this.props.end
		}
	}

	handleSubmit = async() => {
		console.log(this.state);
		const response = await fetch('/tasks/' + this.props.id, {
			method: "PATCH",
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
			[event.target.name]: event.target.value,
		});
	}

	render () {
		return (
			<div className="PatchTask">
					<h3>Editing Task</h3>
					<div class="panel panel-primary">
					<div class="panel panel-heading">Post a new Task</div>
						<div class="panel panel-body">
							<strong>title:</strong> <br /> <input type="text" name="title" value={this.state.title} onChange={this.handleChange} /> <br />
							<strong>author:</strong> <br /> <input type="text" name="author" value={this.state.author} onChange={this.handleChange} /> <br />
							<strong>description:</strong> <br /> <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/> <br />
							<strong>date:</strong> <br /> <input type="text" name="date" value={this.state.date} onChange={this.handleChange} /> <br /><br />
							<strong>start:</strong> <br /> <input type="text" name="start" value={this.state.start} onChange={this.handleChange} /> <br /><br />
							<strong>end:</strong> <br /> <input type="text" name="end" value={this.state.end} onChange={this.handleChange} /> <br /><br />
						</div>
					</div>
					<button type="btn btn-primary" onClick={ () => {this.handleSubmit(); this.props.toggleEdit(); this.props.refresh();}}>Save</button>
				</div>
		);
	}
}

export default PatchTask;