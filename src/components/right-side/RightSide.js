import React, { useContext, useState } from 'react';
import { GlobalContext } from './../../state-manager/globalState.js';

import TopBar from './TopBar.js';
import Tasks from './Tasks.js';
import AddTask from './AddTask.js';
import CompletedTasks from './CompletedTasks.js';


function RightSide(props) {

	//react hooks
	const { getActiveList, deleteListTasks } = useContext(GlobalContext);

	const [state, setState] = useState({
		show_completed_tasks: true,
	})

	function toggleCompletedTasks() {
		setState({
			show_completed_tasks: !state.show_completed_tasks
		})
	}

	const list = getActiveList();
	if (list) {
		const { id, title, tasks } = list;
		const completed_tasks = tasks.filter(task => task.is_completed);
		const incompleted_tasks = tasks.filter(task => !task.is_completed);
		const { show_completed_tasks } = state;

		return (
			<div className="right-side">
				<TopBar
					show_completed_tasks={show_completed_tasks}
					toggleCompletedTasks={toggleCompletedTasks}
					deleteAllTasks={() => deleteListTasks(id)}
					title={title}
				/>
				<Tasks list_id={id} tasks={incompleted_tasks} />
				<AddTask list_id={id} />
				<CompletedTasks list_id={id} show={show_completed_tasks} tasks={completed_tasks} />

			</div>
		)
	}
	return (
		<div></div>
	)
}

export default RightSide;