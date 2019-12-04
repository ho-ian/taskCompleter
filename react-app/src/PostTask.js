import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import cuid from 'cuid';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';
import './PostTask.css';

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
				<div className="posttask_content">
					<input type="button" className="posttask_toggle" onClick={ () => {this.props.toggleOpenPost(); this.props.toggleButton();}} value={this.props.button}></input>
				</div>
				<div className={"posttask_items" + (this.props.openPost ? ' in' : '')}>
					<h3>Post A New Task</h3>
					Title<br /> <input type="text" name="title" autoComplete="off" minLength="1" maxLength="32" value={this.state.title} onChange={this.handleChange} /> <br />
					Author<br /> <input type="text" name="author" autoComplete="off" minLength="2" maxLength="32" value={this.state.author} onChange={this.handleChange} /> <br />
					Description<br /> <input type="text" name="description" autoComplete="off" value={this.state.description} onChange={this.handleChange} /> <br />
					Date<br /> <DatePicker name="date" autoComplete="off" selected={(this.state.date) ? new Date(this.state.date) : ''} onChange={this.handleDateChange}/> <br />
					Start Time<br /> <TimePicker name="start" autoComplete="off" value={(this.state.start === '') ? null : moment(this.state.start, 'HH:mm')} showSecond={false} onChange={this.handleStartTimeChange} /> <br />
					End Time<br /> <TimePicker name="end" autoComplete="off" value={(this.state.end === '') ? null : moment(this.state.end, 'HH:mm')} showSecond={false} onChange={this.handleEndTimeChange} /> <br /><br />
					<button className="btn" onClick={ () => { this.handleSubmit(); } }>Post Task</button>
				</div>
			</div>
		);
	}

}

export default PostTask;