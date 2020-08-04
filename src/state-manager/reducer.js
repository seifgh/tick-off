
const getRandomId = () => Math.round(Math.random() * 10000);



function appReducer(state, action) {

	let lists, id, list, tasks, updated_task, updated_list, list_index, task_index;

	switch (action.type) {

		case 'SET_ACTIVE_LIST':
			return { ...state, active_list_id: action.payload };

		case 'UPDATE_LIST':
			updated_list = action.payload;
			lists = state.lists;
			list_index = lists.map(list => list.id).indexOf(updated_list.id);
			lists[list_index] = { ...lists[list_index], ...updated_list };
			return { ...state, lists };

		case 'ADD_LIST':
			do {
				id = getRandomId();
			} while (state.lists.find(l => l.id === id))
			list = { id, ...action.payload };
			return { ...state, lists: [...state.lists, list] };

		case 'DELETE_LIST_TASKS':
			id = action.payload
			lists = state.lists.map(list => list.id === id ? { ...list, tasks: [] } : list);
			return { ...state, lists }

		case 'DELETE_LIST':
			id = action.payload;
			lists = state.lists.filter(list => list.id !== id);
			return { ...state, lists };

		case 'UPDATE_TASK':
			updated_task = action.payload;
			lists = state.lists;
			list_index = lists.map(list => list.id).indexOf(updated_task.list_id);
			list = lists[list_index];
			tasks = list.tasks;
			task_index = tasks.map(task => task.id).indexOf(updated_task.id);
			tasks[task_index].title = updated_task.title;
			return { ...state, lists };

		case 'COMPLETE_TASK':
			updated_task = action.payload;
			lists = state.lists;
			list_index = lists.map(list => list.id).indexOf(updated_task.list_id);
			list = lists[list_index];
			tasks = list.tasks;
			task_index = tasks.map(task => task.id).indexOf(updated_task.id);
			tasks[task_index].is_completed = true;

			return { ...state, lists };

		case 'DELETE_TASK':
			lists = state.lists;
			list_index = lists.map(list => list.id).indexOf(action.payload.list_id);
			list = lists[list_index];
			list.tasks = list.tasks.filter(task => task.id !== action.payload.id);

			return { ...state, lists };

		case 'INCOMPLETE_TASK':
			updated_task = action.payload;
			lists = state.lists;
			list_index = lists.map(list => list.id).indexOf(updated_task.list_id);
			list = lists[list_index];
			tasks = list.tasks;
			task_index = tasks.map(task => task.id).indexOf(updated_task.id);
			tasks[task_index].is_completed = false;
			return { ...state, lists };

		case 'ADD_TASK':
			lists = state.lists;
			list_index = lists.map(list => list.id).indexOf(action.payload.list_id);
			list = lists[list_index];
			do {
				id = getRandomId();
			} while (list.tasks.find(t => t.id === id));

			list.tasks.push({ title: action.payload.title, id, is_completed: false });


			return { ...state, lists };


		default: return state;
	}
}

export default appReducer;