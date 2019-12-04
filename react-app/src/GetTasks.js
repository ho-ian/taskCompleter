import React, { Component } from 'react';
import Task from './Task';
import PostTask from './PostTask';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import moment from 'moment';
import "react-datepicker/dist/react-datepicker.css";
import 'rc-time-picker/assets/index.css';
import './GetTasks.css';

class GetTasks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			author: '',
			title:'',
			date: (new Date()).toLocaleDateString(),
			start:'',
			end:'',
			complete: false,
			incomplete: false,
			button: '+'
		};
		this.toggleButton = this.toggleButton.bind(this);
	}

	buildParams() {
		var params = [];
	
		if (this.state.author !== '') {
			params.push("author=" + encodeURIComponent(this.state.author));
		}
		if (this.state.title !== '') {
			params.push("title=" + encodeURIComponent(this.state.title));
		}
		if (this.state.date !== '') {
			params.push("date=" + encodeURIComponent(this.state.date));
		}
		if (this.state.start !== '') {
			params.push("start=" + encodeURIComponent(this.state.start));
		}
		if (this.state.end !== '') {
			params.push("end=" + encodeURIComponent(this.state.end));
		}
		if (this.state.complete) {
			params.push("completed=true");
		}
		if (this.state.incomplete) {
			params.push("completed=false");
		}
	
		if (params.length === 0) {
			return '';
		}
		else {
			return '?' + params.join('&');
		}
	}

	callAPI = async() => {
		const query = this.buildParams();
		const res = await fetch('/tasks' + query);
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

	componentDidUpdate(prevProps) {
		if (this.props.didStateChange !== prevProps.didStateChange) {
			this.callAPI()
			.then(res => this.setState({ data : res }))
			.catch(err => console.log(err));
		}
	}

	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value
		});
		this.props.toggleState();
	}

	handleComplete = (event) => {
		this.setState({
			complete: !this.state.complete,
			incomplete: false
		});
		this.props.toggleState();
	}

	handleIncomplete = (event) => {
		this.setState({
			incomplete: !this.state.incomplete,
			complete: false
		});
		this.props.toggleState();
	}

	handleDateChange = (event) => {
		const date = (event) ? event.toLocaleDateString() : '';
		this.setState({
			date: date
		});
		this.props.toggleState();
	}

	handleStartTimeChange = (event) => {
		const time = (event) ? event.format('HH:mm') : '';
		this.setState({
			start: time
		});
		this.props.toggleState();
	}

	handleEndTimeChange = (event) => {
		const time = (event) ? event.format('HH:mm') : '';
		this.setState({
			end: time
		});
		this.props.toggleState();
	}

	toggleButton() {
		if (this.state.button === '+') {
			this.setState({
				button: '─'
			});
		}
		else {
			this.setState({
				button: '+'
			});
		}
		
	}

	render() {

		const tasks = this.state.data
			.sort(function (a, b) {
				const dateA = a.date.split("/");
				const timeA = a.start.split(":");
				const dateB = b.date.split("/");
				const timeB = b.start.split(":");

				return new Date(dateA[2], dateA[0], dateA[1], timeA[0], timeA[1]) - new Date(dateB[2], dateB[0], dateB[1], timeB[0], timeB[1]);
			})
			.map((task, key) =>
			<Task task={task} key={task.taskId} toggleState={this.props.toggleState} />
		);

		return (
			<div className="GetTasks">
				<div className="Wrapper">
					<div className="SearchAndPostBar">
						<div className="LeftCell">
							<div className="SearchTasks">
								<h3>Search Parameters</h3>
								Title<br /> <input type="text" name="title" autoComplete="off" value={this.state.title} onChange={this.handleChange} /> <br />
								Author<br /> <input type="text" name="author" autoComplete="off" value={this.state.author} onChange={this.handleChange} /> <br />
								Date<br /> <DatePicker name="date" autoComplete="off" selected={(this.state.date) ? new Date(this.state.date) : ''} onChange={this.handleDateChange}/> <br />
								Start Time<br /> <TimePicker name="start" className="timepicker" autoComplete="off" defaultValue={(this.state.start === '') ? null : moment(this.state.start, 'HH:mm')} showSecond={false} onChange={this.handleStartTimeChange} /> <br />
								End Time<br /> <TimePicker name="end" className="timepicker" autoComplete="off" defaultValue={(this.state.end === '') ? null : moment(this.state.end, 'HH:mm')} showSecond={false} onChange={this.handleEndTimeChange} /> <br /> <br />
								<input type="checkbox" name="completed" checked={this.state.complete} onChange={this.handleComplete}/>Complete <br />
								<input type="checkbox" name="completed" checked={this.state.incomplete} onChange={this.handleIncomplete}/>Incomplete <br />
							</div>
						</div>
						<div className="MiddleCell">
							<div className="TaskList">{tasks}</div>
						</div>
						<div className="RightCell">
							<PostTask className="PostTasks" 
								toggleState={this.props.toggleState}
								toggleOpenPost={this.props.toggleOpenPost} 
								openPost={this.props.openPost} 
								toggleButton={this.toggleButton}
								button={this.state.button}/>
						</div>
					</div>
				</div>
			</div>
		);

	}
}

export default GetTasks;