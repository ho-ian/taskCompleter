import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';

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
		const body = await response.json().then(this.props.toggleState());

		console.log(body);
	}

	handleDelete = async() => {
		const response = await fetch('/tasks/' + this.props.id, {
			method: "DELETE",
			headers: {
				'Content-Type': 'application/json'
			}
		});
		const body = await response.json().then(this.props.toggleState());

		console.log(body);
	}
	
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleClick = (event) => {
		if (this.state.completed === 'false') {
			this.setState({
				completed: 'true'
			});
		}
		else {
			this.setState({
				completed: 'false'
			});
		}
	}

	handleDateChange = (event) => {
		const date = (event) ? event.toLocaleDateString() : '';
		this.setState({
			date: date
		});
	}

	handleStartTimeChange = (event) => {
		var time = (event) ? event.format('HH:mm') : '';
		this.setState({
			start: time
		});
	}

	handleEndTimeChange = (event) => {
		var time = (event) ? event.format('HH:mm') : '';
		this.setState({
			end: time
		});
	}

	render () {
		return (
			<div className="PatchTask">
					<h3>Editing Task</h3>
					<div className="panel panel-primary">
					<div className="panel panel-heading">Post a new Task</div>
						<button type="btn btn-primary close" onClick={this.props.toggleEdit}>X</button>
						<button type="btn btn-primary close" onClick={() => { if (window.confirm('Are you sure you want to delete this task?')) { this.handleDelete(); }}}>Delete Task</button>
						<div className="panel panel-body">
							<strong>Title:</strong> <br /> <input type="text" name="title" minLength="1" maxLength="32" value={this.state.title} onChange={this.handleChange} /> <br />
							<strong>Description:</strong> <br /> <input type="text" name="description" value={this.state.description} onChange={this.handleChange} /> <br />
							<strong>Date:</strong> <DatePicker name="date" selected={(this.state.date) ? new Date(this.state.date) : ''} onChange={this.handleDateChange} /> <br />
							<strong>Start Time:</strong> <TimePicker name="start" value={(this.state.start === '') ? null : new moment(this.state.start, 'HH:mm')} showSecond={false} onChange={this.handleStartTimeChange} /> <br /><br />
							<strong>End Time:</strong> <TimePicker name="end" value={(this.state.end === '') ? null : new moment(this.state.end, 'HH:mm')} showSecond={false} onChange={this.handleEndTimeChange} /> <br /><br />
							<input type="checkbox" name="completed" defaultChecked={(this.state.completed === 'true')} onClick={this.handleClick}/>Is the task complete?
						</div>
					</div>
					<button type="btn btn-primary" onClick={ () => { this.handleSubmit(); this.props.toggleEdit();} }>Save</button>
				</div>
		);
	}
}

export default PatchTask;