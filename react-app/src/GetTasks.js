import React, { Component } from 'react';
import Task from './Task';

class GetTasks extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: [],
			author: '',
			title:'',
			date:'',
			start:'',
			end:'',
			complete: false,
			incomplete: false
		};
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

	render() {

		const tasks = this.state.data.map((task, key) =>
			<Task task={task} key={task.title} toggleState={this.props.toggleState} />
		);

		return (
			<div className="GetTasks">
				<div className="SearchTasks">
					Author: <br /> <input type="text" name="author" value={this.state.author} onChange={this.handleChange} /> <br />
					title: <br /> <input type="text" name="title" value={this.state.title} onChange={this.handleChange} /> <br />
					date: <br /> <input type="text" name="date" value={this.state.date} onChange={this.handleChange} /> <br /><br />
					start: <br /> <input type="text" name="start" value={this.state.start} onChange={this.handleChange} /> <br /><br />
					end: <br /> <input type="text" name="end" value={this.state.end} onChange={this.handleChange} /> <br /><br />
					<input type="checkbox" name="completed" checked={this.state.complete} onChange={this.handleComplete}/>Complete 
					<input type="checkbox" name="completed" checked={this.state.incomplete} onChange={this.handleIncomplete}/>Incomplete
				</div>
				<div className="TaskList">{tasks}</div>
			</div>
		);

	}
}

export default GetTasks;