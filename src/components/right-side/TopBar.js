import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


function TopBar({ title, toggleCompletedTasks, deleteAllTasks, show_completed_tasks }) {

	return (
		<div className="top-bar">
			<h2>{title}</h2>
			<div title="Toggle completed tasks" onClick={toggleCompletedTasks} className={`icon${show_completed_tasks ? ' active' : ''}`}>
				<FontAwesomeIcon icon={faCheck} />
			</div>

			<div title="Delete all tasks" className="icon delete" onClick={deleteAllTasks} >
				<FontAwesomeIcon icon={faTrashAlt} />
			</div>

		</div>
	)


}



export default TopBar;