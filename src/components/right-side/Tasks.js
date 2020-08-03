import React from 'react';


import Task from './Task.js';


function Tasks({ tasks, list_id }) {

	return (
		<div className="tasks">
			{
				tasks.map(({ id, title }) => (
					<Task key={id} list_id={list_id} id={id} title={title} />
				))
			}
		</div>
	)

}

export default Tasks;