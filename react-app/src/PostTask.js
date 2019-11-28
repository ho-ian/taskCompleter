import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import cuid from 'cuid';
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

const pattern = /..:../;

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
		const body = await response.json();

		console.log(body);
	}
	
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
	}

	handleDateChange = (event) => {
		this.setState({
			date: event.toLocaleDateString()
		});
	}

	handleStartTimeChange = (event) => {
		var time = event.toDate().toTimeString();
		this.setState({
			end: (event) ? time.match(pattern)[0] : ''
		});
	}

	handleEndTimeChange = (event) => {
		var time = event.toDate().toTimeString();
		this.setState({
			end: (event) ? time.match(pattern)[0] : ''
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
						<strong>Author:</strong> <input type="text" name="author" autoComplete="off" value={this.state.author} onChange={this.handleChange} /> <br />
						<strong>title:</strong> <input type="text" name="title" autoComplete="off" value={this.state.title} onChange={this.handleChange} /> <br />
						<strong>description:</strong> <input type="text" name="description" autoComplete="off" value={this.state.description} onChange={this.handleChange}/> <br />
						<strong>date:</strong> <DatePicker name="date" selected={(this.state.date) ? new Date(this.state.date) : ''} onChange={this.handleDateChange}/> <br />
						<strong>start:</strong> <TimePicker name="start" value={(this.state.start === '') ? null : moment(this.state.start, 'HH:mm')} showSecond={false} onChange={this.handleStartTimeChange} /> <br /><br />
						<strong>end:</strong> <TimePicker name="end" value={(this.state.end === '') ? null : moment(this.state.end, 'HH:mm')} showSecond={false} onChange={this.handleEndTimeChange} /> <br /><br />
						<button className="btn btn-primary" onClick={() => {this.handleSubmit(); this.reset(); this.props.toggleState();}}>Post Task</button>
					</div>
				</div>
			</div>
		);
	}

}

export default PostTask;