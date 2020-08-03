import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function TopBar({ handleSearchChange, search_key }) {

	const [state, setState] = useState({ is_focused: false });
	const { is_focused } = state;
	return (
		<div className={`top-bar${is_focused ? ' active' : ''}`}>
			<div className="icon ">
				<FontAwesomeIcon icon={faSearch} />
			</div>
			<input onFocus={() => setState({ is_focused: true })} onBlur={() => setState({ is_focused: false })} onChange={(e) => handleSearchChange(e)} className="search" type="text" placeholder="Search" value={search_key} />
		</div>
	)
}


export default TopBar;