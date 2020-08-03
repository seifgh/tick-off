import React, { useContext, useState } from 'react';

import { GlobalContext } from './../../state-manager/globalState.js';

import TopBar from './TopBar.js';
import Lists from './Lists.js';
import AddList from './AddList.js';


function LeftSide(props) {
	//react hooks
	const { lists } = useContext(GlobalContext);
	const [state, setState] = useState({ filtered_lists: lists, search_key: '' })



	function handleSearchChange(e) {
		const search_key = e.target.value.toLowerCase();
		if (search_key) {
			const filtered_lists = lists.filter(list => list.title.toLowerCase().includes(search_key));

			setState({
				filtered_lists,
				search_key
			})
		} else {
			setState({
				search_key
			})
		}

	}

	const { filtered_lists, search_key } = state;
	return (
		<div className="left-side">
			<TopBar search_key={search_key} handleSearchChange={(e) => handleSearchChange(e)} />
			<Lists lists={search_key ? filtered_lists : lists} />
			<AddList />
		</div>
	)

}

export default LeftSide;