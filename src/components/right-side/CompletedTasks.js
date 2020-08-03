import React from 'react';


import CompletedTask from './CompletedTask.js';


function CompletedTasks({ show, tasks, list_id }) {

	return (
		<div className={`completed-tasks${show ? '' : ' hide'}`} >
			<h3>Completed tasks - {tasks.length}</h3>
			<div className="tasks">
				{
					tasks.map(({ title, id }) => (
						<CompletedTask key={id} title={title} id={id} list_id={list_id} />
					))
				}
			</div>
		</div>
	)

}

export default CompletedTasks;