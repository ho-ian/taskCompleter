import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import cuid from 'cuid';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';

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
			end: ''
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
		const body = await response.json()
			.then(this.props.toggleState())
			.then(this.reset());

		console.log(body);
	}
	
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleDateChange = (event) => {
		const date = (event) ? event.toLocaleDateString() : '';
		this.setState({
			date: date
		});
	}

	handleStartTimeChange = (event) => {
		const time = (event) ? event.format('HH:mm') : '';
		this.setState({
			start: time
		});
	}

	handleEndTimeChange = (event) => {
		const time = (event) ? event.format('HH:mm') : '';
		this.setState({
			end: time
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
				<div className="panel panel-primary">
				<div className="panel panel-heading">Post a new Task</div>
					<div className="panel panel-body">
						<strong>Title:</strong> <input type="text" name="title" minLength="1" maxLength="32" autoComplete="off" value={this.state.title} onChange={this.handleChange} /> <br />
						<strong>Author:</strong> <input type="text" name="author" minLength="2" maxLength="32" autoComplete="off" value={this.state.author} onChange={this.handleChange} /> <br />
						<strong>Description:</strong> <input type="text" name="description" autoComplete="off" value={this.state.description} onChange={this.handleChange}/> <br />
						<strong>Date:</strong> <DatePicker name="date" selected={(this.state.date) ? new Date(this.state.date) : ''} onChange={this.handleDateChange}/> <br />
						<strong>Start Time:</strong> <TimePicker name="start" value={(this.state.start === '') ? null : moment(this.state.start, 'HH:mm')} showSecond={false} onChange={this.handleStartTimeChange} /> <br /><br />
						<strong>End Time:</strong> <TimePicker name="end" value={(this.state.end === '') ? null : moment(this.state.end, 'HH:mm')} showSecond={false} onChange={this.handleEndTimeChange} /> <br /><br />
						<button className="btn btn-primary" onClick={ () => { this.handleSubmit(); } }>Post Task</button>
					</div>
				</div>
			</div>
		);
	}

}

export default PostTask;