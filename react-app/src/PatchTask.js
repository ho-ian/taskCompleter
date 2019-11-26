import React, { Component } from 'react';

class PatchTask extends Component {
	constructor(props){
		super(props);
		this.state = {
			title: this.props.title,
			description: this.props.description,
			date: this.props.date,
			start: this.props.start,
			end: this.props.end,
			completed: this.props.completed
		}
	}

	handleSubmit = async() => {
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

	handleDelete = async() => {
		const response = await fetch('/tasks/' + this.props.id, {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const body = await response.json();

		console.log(body);
	}
	
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleClick = (event) => {
		this.setState({
			completed: !this.state.completed
		});
	}

	render () {
		return (
			<div className="PatchTask">
					<h3>Editing Task</h3>
					<div class="panel panel-primary">
					<div class="panel panel-heading">Post a new Task</div>
						<button type="btn btn-primary close" onClick={this.props.toggleEdit}>X</button>
						<button type="btn btn-primary close" onClick={() => { if (window.confirm('Are you sure you want to delete this task?')) this.handleDelete();}}>Delete Task</button>
						<div class="panel panel-body">
							<strong>title:</strong> <br /> <input type="text" name="title" value={this.state.title} onChange={this.handleChange} /> <br />
							<strong>description:</strong> <br /> <input type="text" name="description" value={this.state.description} onChange={this.handleChange}/> <br />
							<strong>date:</strong> <br /> <input type="text" name="date" value={this.state.date} onChange={this.handleChange} /> <br /><br />
							<strong>start:</strong> <br /> <input type="text" name="start" value={this.state.start} onChange={this.handleChange} /> <br /><br />
							<strong>end:</strong> <br /> <input type="text" name="end" value={this.state.end} onChange={this.handleChange} /> <br /><br />
							<input type="checkbox" name="completed" checked={this.state.completed} onClick={this.handleClick}/>Is the task complete?
						</div>
					</div>
					<button type="btn btn-primary" onClick={ () => {this.handleSubmit(); this.props.toggleEdit();}}>Save</button>
				</div>
		);
	}
}

export default PatchTask;