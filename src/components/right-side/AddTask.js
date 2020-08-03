import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import { GlobalContext } from './../../state-manager/globalState.js';

function AddTask({ list_id }) {

	// react hooks
	const { addTask } = useContext(GlobalContext);

	const [state, setState] = useState({
		title: '',
		show_add_form: false
	});

	function showHideAddForm(bool) {
		setState({ ...state, show_add_form: bool });
	}

	function changeTitle({ target }) {
		setState({ ...state, title: target.value })
	}

	function handleSubmit(e) {
		const title = state.title.trim();
		if (title) {
			e.preventDefault();
			addTask({ list_id, title });

		}
		setState({
			title: '',
			show_add_form: false
		})
	}

	const { show_add_form, title } = state;

	return (
		<div>
			<form onSubmit={handleSubmit} className={`task${show_add_form ? ' show' : ''}`}>
				<div className="icon check-icon">
					<i className="fas " />
				</div>
				<input onChange={changeTitle} onBlur={handleSubmit} autoFocus={true} className="title" type="text" placeholder="task title" value={title} />

			</form>
			<div onClick={() => showHideAddForm(!show_add_form)} title="Add new task" className={`add-icon icon ic-hg${show_add_form ? ' close' : ''}`}>
				<i className="fa fa-plus" />
				<FontAwesomeIcon icon={faPlus} />
			</div>
		</div>
	)
}




export default AddTask;