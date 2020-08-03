import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleNotch, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

import Dropdown from './../shared/Dropdown';


import { colors } from './AddList.js'

import { GlobalContext } from './../../state-manager/globalState.js';

function List(props) {

	const { updateList, deleteList, setActiveList, active_list_id } = useContext(GlobalContext);

	const [ list, setList ] = useState({
		color: props.color,
		title: props.title,
	})
	const [showEditVersion, setEditVersion] = useState(false)


	function cancelEdit() {
		setList({
			color: props.color,
			title: props.title,
		})
		setEditVersion(false)
	}

	function changeColor(color) {
		setList({
			...list, color,
		})
	}

	function changeTitle({ target }) {
		setList({
			...list, title: target.value,
		})
	}

	function handleSubmit(e) {
		e.preventDefault();
		const title = list.title.trim()
		if (title) {
			updateList({ title, color: list.color, id: props.id });
			setList({...list, title})
			setEditVersion(false);
		}
	}

	async function handleDelete() {
		await deleteList(props.id);
		await setActiveList(1);
	}

	const { title, color } = list;

	if (showEditVersion) {

		return (
			<form onSubmit={handleSubmit} className={`add-list-form show`}>
				<input onChange={changeTitle} type="text" placeholder="List title" value={title} />
				<br />
				<b>color</b>
				<br />
				<div className="colors">
					{colors.map((cl, i) => (
						<span onClick={() => changeColor(cl)} key={i} className={cl === color ? 'selected' : ''} style={{ background: cl }} />
					))}
				</div>

				<div className="btns">
					<button type="button" onClick={cancelEdit} className="cancel" >cancel</button>
					<button type="submit" className="add" >save</button>
				</div>

			</form>
		)
	}
	// display version 
	const uncompleted_tasks_length = props.tasks.filter(task => !task.is_completed).length;
	const is_active = active_list_id === props.id;

	if (props.id !== 1) {
		return (
			<div onClick={() => setActiveList(props.id)} className={`list${is_active ? ' active' : ''}`}>
				<div style={{ color }} className="icon">
					<FontAwesomeIcon icon={faCircleNotch} />
				</div>
				<b>{title}</b>

				<small className="count icon" >{uncompleted_tasks_length}</small>
				<Dropdown>
					<div onClick={() => setEditVersion(true)} className="action">
						<div className="icon">
							<FontAwesomeIcon icon={faEdit} />
						</div>
						<small>Edit</small>
					</div>

					<div onClick={handleDelete} className="action">
						<div className="icon">
							<FontAwesomeIcon icon={faTrash} />
						</div>
						<small>Delete</small>
					</div>
				</Dropdown>
			</div>
		)
	}
	// first list ( to-do ) is imutable
	return (
		<div onClick={() => setActiveList(props.id)} className={`list${is_active ? ' active' : ''}`}>
			<div style={{ color: color }} className="icon">
				<FontAwesomeIcon icon={faCircleNotch} />
			</div>
			<b>{title}</b>
			<small style={{ display: 'block' }} className={`count icon`} >{uncompleted_tasks_length}</small>
		</div>
	)
}

export default List;