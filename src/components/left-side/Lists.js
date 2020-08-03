import React from 'react';

import List from './List.js';

function Lists({ lists }) {
	if (lists)
		return (
			<div className="lists">
				{
					lists.map(list => (
						<List key={list.id}  {...list} />
					))
				}
			</div>
		)
	return null
}

export default Lists;