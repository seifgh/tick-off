import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquare, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import Dropdown from './../shared/Dropdown';
import { GlobalContext } from './../../state-manager/globalState.js';


function Task({ id, title, list_id }) {

	//react hooks
	const { updateTask, completeTask, deleteTask } = useContext(GlobalContext);

	const [showEditVersion, setEditVersion] = useState(false)
	const [_title, setTitle] = useState(title)

	function handleSubmit(e) {
		e.preventDefault();
		const title = _title.trim();
		if (title) {
			updateTask({ id, list_id, title });
			setEditVersion(false);
		}
	}

	const titleComponent = showEditVersion ?
		<form onSubmit={handleSubmit} >
			<input onChange={({target}) => setTitle(target.value)} onBlur={handleSubmit} autoFocus={true} className="title" type="text" value={_title} />
		</form>
		: <div onClick={() => setEditVersion(true)} className="title">{_title}</div>;

	return (
		<div className={`task${showEditVersion ? ' edit' : ''}`}>
			<div title="Complete task" onClick={() => completeTask({ id, list_id })} className="icon ic-md check-icon">
				<FontAwesomeIcon icon={faSquare} />
			</div>
			{titleComponent}
			<Dropdown>
				<div onClick={() => setEditVersion(true)} className="action">
					<div className="icon">
						<FontAwesomeIcon icon={faEdit} />
					</div>
					<small>Edit</small>
				</div>

				<div onClick={() => deleteTask({ id, list_id })} className="action">
					<div className="icon">
						<FontAwesomeIcon icon={faTrash} />
					</div>
					<small>Delete</small>
				</div>
			</Dropdown>
		</div>
	)

}

export default Task;