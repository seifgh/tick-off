import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare } from '@fortawesome/free-solid-svg-icons';

import { GlobalContext } from './../../state-manager/globalState.js';

function CompleteTask({ id, title, list_id }) {

	//react hooks
	const { incompleteTask, deleteTask } = useContext(GlobalContext);

	const [state, setState] = useState({
		show_actions: false,
	})

	function toggleActions() {
		setState({
			show_actions: !state.show_actions
		})
	}

	const { show_actions } = state;

	return (
		<div className="task">
			<div onClick={() => incompleteTask({ id, list_id })} className="icon ic-md check-icon">
				<FontAwesomeIcon icon={faCheckSquare} />
			</div>
			<div className="title">{title}</div>
			<div className={`actions${show_actions ? ' show' : ''}`}>
				<div onClick={() => toggleActions()} className="icon">
					<i className="fa fa-ellipsis-v" />
				</div>
				<div className="actions-list">


					<div onClick={() => deleteTask({ id, list_id })} className="action">
						<div className="icon">
							<i className="fa fa-trash" />
						</div>
						<small>Delete</small>
					</div>
				</div>
			</div>
		</div>
	)

}

export default CompleteTask;