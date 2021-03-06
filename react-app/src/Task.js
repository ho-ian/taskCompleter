import React, { Component } from 'react';
import moment from 'moment';
import PatchTask from './PatchTask';
import './Task.css';

class Task extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
			isEditing: false
		};
		this.toggleEdit = this.toggleEdit.bind(this);
		this.toggle = this.toggle.bind(this);
	}

	toggle() {
		this.setState({
			open: !this.state.open
		});
	}

	toggleEdit() {
		this.setState({
			isEditing: !this.state.isEditing
		});
	}

	render() {
		if (this.state.isEditing) {
			return (
				<PatchTask id={this.props.task.id}
						taskId={this.props.task.taskId}
						author={this.props.task.author}
						title={this.props.task.title}
						description={this.props.task.description}
						date={this.props.task.date}
						start={this.props.task.start}
						end={this.props.task.end}
						completed={this.props.task.completed}
						toggleEdit={this.toggleEdit}
						toggleState={this.props.toggleState}
						patchSuccess={this.props.patchSuccess}
						patchFailure={this.props.patchFailure}
						deleteSuccess={this.props.deleteSuccess} />
			);
		}
		return (
			<div className="Task">
				<div className="task_contents">
					<button type="btn" className="task_toggle" onClick={this.toggle}>
						<h3 className={"task_title" + ((this.props.task.completed === 'true') ? ' done' : '') + ((new moment(this.props.task.date + " " + this.props.task.start, 'MM-DD-YYYY HH:mm')) < new moment() && (new moment() < new moment(this.props.task.date + " " + this.props.task.end, 'MM-DD-YYYY HH:mm')) ? ' current' : '')}>
							{(new Date(this.props.task.date)).toDateString()} {this.props.task.start} {this.props.task.title}</h3>
						<div className="icon">
							<span className={"chevron" + (this.state.open ? ' in' : '') + ((this.props.task.completed === 'true') ? ' done' : '') + ((new moment(this.props.task.date + " " + this.props.task.start, 'MM-DD-YYYY HH:mm')) < new moment() && (new moment() < new moment(this.props.task.date + " " + this.props.task.end, 'MM-DD-YYYY HH:mm')) ? ' current' : '')}></span>
						</div>
					</button>
				</div>
				<div className={"task_items" + (this.state.open ? ' in' : '') + ((this.props.task.completed === 'true') ? ' done' : '') + ((new moment(this.props.task.date + " " + this.props.task.start, 'MM-DD-YYYY HH:mm')) < new moment() && (new moment() < new moment(this.props.task.date + " " + this.props.task.end, 'MM-DD-YYYY HH:mm')) ? ' current' : '')}>
					<h5>{this.props.task.author}</h5>
					<p>Description: {this.props.task.description}</p>
					<p>Date: {this.props.task.date}</p>
					<p>Start Time: {this.props.task.start}</p>
					<p>End Time: {this.props.task.end}</p>
					<button type="btn" onClick={this.toggleEdit}>Edit Task</button>
				</div>
			</div>
		);
	}
}

export default Task;