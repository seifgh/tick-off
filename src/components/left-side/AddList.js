import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'

import { GlobalContext } from './../../state-manager/globalState.js';

export const colors = [
	'#428af5', '#496ea3', '#41b57b', '#2c8257', '#d12b28',
	'#94211f', '#3444a8', '#1a2b91', '#c724d6', '#84148f',
	'black'
];

function AddList(props) {

	const { addList } = useContext(GlobalContext);

	const [list, setList] = useState({
		title: '',
		color: '#428af5',
		showForm: false,
	})

	const [showForm, setShowForm] = useState(false)


	function cancelAdd(e) {
		e.preventDefault();
		setShowForm(false);
	}

	// form events

	function changeColor(color) {
		setList({
			...list, color,
		})
	}

	function changeTitle({target}) {
		setList({
			...list, title: target.value,
		})
	}

	function handleSubmit(e) {
		e.preventDefault();
		const title = list.title.trim()
		if (title) {
			addList({ title, color: list.color });
			setList({
				title: '', color: '#428af5'
			});
			setShowForm(false);
		}
	}

	const { color, title } = list;

	return (
		<div className="add-list">
			<div onClick={() => setShowForm(!showForm)} className="add-top-bar">
				<div className="icon">
					<FontAwesomeIcon icon={faPlusSquare} />
				</div>
				<b>Add list</b>
			</div>
			<form onSubmit={handleSubmit} className={`add-list-form${showForm ? ' show' : ''}`}>
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
					<button type="button" onClick={(e) => cancelAdd(e)} className="cancel" >cancel</button>
					<button className="add" type="submit" >add list</button>
				</div>

			</form>
		</div>
	)
}


export default AddList;