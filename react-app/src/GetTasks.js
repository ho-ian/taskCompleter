import React, { Component } from 'react';
import Task from './Task';
import PostTask from './PostTask';
import Tips from './Tips';
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
			date: '',
			start:'',
			end:'',
			complete: false,
			incomplete: false,
			button: '+',
			extract: '',
			today: false,
			week: false,
			month: false,
			year: false
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

	handleComplete = () => {
		this.setState({
			complete: !this.state.complete,
			incomplete: false
		});
		this.props.toggleState();
	}

	handleIncomplete = () => {
		this.setState({
			incomplete: !this.state.incomplete,
			complete: false
		});
		this.props.toggleState();
	}

	handleDateChange = (event) => {
		const date = (event) ? event.toLocaleDateString() : '';
		this.setState({
			date: date,
			extract: '',
			today: false,
			week: false,
			month: false,
			year: false
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

	handleToday = () => {
		if (this.state.extract === 'today') {
			this.setState({
				extract: '',
				today: false
			});
		}
		else {
			this.setState({
				extract: 'today',
				date: '',
				today: true,
				week: false,
				month: false,
				year: false
			});
		}

		this.props.toggleState();
	}

	handleWeek = () => {
		if (this.state.extract === 'week') {
			this.setState({
				extract: '',
				week: false
			});
		}
		else {
			this.setState({
				extract: 'week',
				date: '',
				week: true,
				today: false,
				month: false,
				year: false
			});
		}

		this.props.toggleState();
	}

	handleMonth = () => {
		if (this.state.extract === 'month') {
			this.setState({
				extract: '',
				month: false
			});
		}
		else {
			this.setState({
				extract: 'month',
				date: '',
				month: true,
				today: false,
				week: false,
				year: false
			});
		}

		this.props.toggleState();
	}

	handleYear = () => {
		if (this.state.extract === 'year') {
			this.setState({
				extract: '',
				year: false
			});
		}
		else {
			this.setState({
				extract: 'year',
				date: '',
				year: true,
				today: false,
				week: false,
				month: false
			});
		}

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

	extractTasks(array) {
		var newArr = [];
		switch(this.state.extract) {
			case 'today':
				for (var i = 0; i < array.length; i++) {
					if ((new Date(array[i].date)).getTime() === (new Date().setHours(0,0,0,0))) {
						newArr.push(array[i]);
					}
					else if ((new Date(array[i].date)).getTime() > (new Date().setHours(0,0,0,0))) {
						break;
					}
				}
				break;
			case 'week':
				var today = new Date()
				var nextweek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
				for (var i = 0; i < array.length; i++) {
					if ((new Date(array[i].date) >= today) && (new Date(array[i].date) < nextweek)) {
						newArr.push(array[i]);
					}
					else if (new Date(array[i].date) >= nextweek) {
						break;
					}
				}
				break;
			case 'month':
				var year = new Date().getFullYear();
				var month = new Date().getMonth();
				for (var i = 0; i < array.length; i++) {
					if ((new Date(array[i].date).getFullYear() === year) && (new Date(array[i].date).getMonth() === month)) {
						newArr.push(array[i]);
					}
					else if ((new Date(array[i].date).getFullYear() === year) && (new Date(array[i].date).getMonth() > month)) {
						break;
					}
					else if (new Date(array[i].date).getFullYear() > year) {
						break;
					}
				}
				break;
			case 'year':
				var year = new Date().getFullYear();
				for (var i = 0; i < array.length; i++) {
					if (new Date(array[i].date).getFullYear() === year) {
						newArr.push(array[i]);
					}
					else if (new Date(array[i].date).getFullYear() > year) {
						break;
					}
				}
				break;
			default:
				return array;
		}
		return newArr;
	}

	render() {

		var tasks = this.state.data
			.sort(function (a, b) {
				const dateA = a.date.split("/");
				const timeA = a.start.split(":");
				const dateB = b.date.split("/");
				const timeB = b.start.split(":");

				return new Date(dateA[2], dateA[0], dateA[1], timeA[0], timeA[1]) - new Date(dateB[2], dateB[0], dateB[1], timeB[0], timeB[1]);
			});
		
		tasks = this.extractTasks(tasks)
			.map((task, key) =>
			<Task task={task}
				key={task.taskId}
				toggleState={this.props.toggleState}
				patchSuccess={this.props.patchSuccess}
				patchFailure={this.props.patchFailure}
				deleteSuccess={this.props.deleteSuccess}/>
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
								<h3>Time Parameters</h3>
								<input type="checkbox" name="today" checked={this.state.today} onChange={this.handleToday}/>Today <br />
								<input type="checkbox" name="week" checked={this.state.week} onChange={this.handleWeek}/>Week <br />
								<input type="checkbox" name="month" checked={this.state.month} onChange={this.handleMonth}/>Month <br />
								<input type="checkbox" name="year" checked={this.state.year} onChange={this.handleYear}/>Year <br />
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
								button={this.state.button}
								postSuccess={this.props.postSuccess}
								postFailure={this.props.postFailure} />
							<Tips className="Tips" />
						</div>
					</div>
				</div>
			</div>
		);

	}
}

export default GetTasks;