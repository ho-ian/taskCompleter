import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';
import './PatchTask.css';

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

		if (response.status === 200) {
			this.props.patchSuccess();
		}
		else {
			this.props.patchFailure();
		}
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
		this.props.deleteSuccess();
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
			<div className={"PatchTask" + ((this.state.completed === 'true') ? ' done' : '') + ((new moment(this.state.date + " " + this.state.start, 'MM-DD-YYYY HH:mm')) < new moment() && (new moment() < new moment(this.state.date + " " + this.state.end, 'MM-DD-YYYY HH:mm')) ? ' current' : '')}>
					<div className="patchtask_content">
						<h3>Editing Task with TaskId: {this.props.taskId}</h3>
						<button type="btn" className="cancel" onClick={this.props.toggleEdit}>×</button>
					</div>
						
					<div className="patchtask_items">
						Title <input type="text" name="title" autoComplete="off" minLength="1" maxLength="32" value={this.state.title} onChange={this.handleChange} /> <br />
						Description <input type="text" name="description" autoComplete="off" value={this.state.description} onChange={this.handleChange} /> <br />
						Date <DatePicker name="date" autoComplete="off" selected={(this.state.date) ? new Date(this.state.date) : ''} onChange={this.handleDateChange} /> <br />
						Start Time <TimePicker name="start" autoComplete="off" value={(this.state.start === '') ? null : new moment(this.state.start, 'HH:mm')} showSecond={false} onChange={this.handleStartTimeChange} /> <br />
						End Time <TimePicker name="end" autoComplete="off" value={(this.state.end === '') ? null : new moment(this.state.end, 'HH:mm')} showSecond={false} onChange={this.handleEndTimeChange} /> <br />
						<input type="checkbox" name="completed" defaultChecked={(this.state.completed === 'true')} onClick={this.handleClick}/>Is the task complete?
					</div>
					<div className="patchtask_savedelete">
						<button type="btn" onClick={ () => { this.handleSubmit(); this.props.toggleEdit();} }>Save</button>
						<button type="btn" onClick={() => { if (window.confirm('Are you sure you want to delete this task?')) { this.handleDelete(); }}}>Delete Task</button>
					</div>
				</div>
		);
	}
}

export default PatchTask;