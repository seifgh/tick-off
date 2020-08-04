import React, { useContext, useState } from 'react';
import { GlobalContext } from './../../state-manager/globalState.js';

import TopBar from './TopBar.js';
import Tasks from './Tasks.js';
import AddTask from './AddTask.js';
import CompletedTasks from './CompletedTasks.js';


function RightSide(props) {

	const { getActiveList, deleteListTasks } = useContext(GlobalContext);
	const [showCompletedTasks, setShowCompletedTasks] = useState(false);

	const list = getActiveList();
	if (list) {
		const { id, title, tasks } = list;
		const completed_tasks = tasks.filter(task => task.is_completed);
		const incompleted_tasks = tasks.filter(task => !task.is_completed);

		return (
			<div className="right-side">
				<TopBar
					showCompletedTasks={showCompletedTasks}
					toggleCompletedTasks={() => setShowCompletedTasks(!showCompletedTasks)}
					deleteAllTasks={() => deleteListTasks(id)}
					title={title}
				/>
				<Tasks list_id={id} tasks={incompleted_tasks} />
				<AddTask list_id={id} />
				<CompletedTasks list_id={id} show={showCompletedTasks} tasks={completed_tasks} />
			</div>
		)
	}
	return null
}

export default RightSide;