import React, { createContext, useReducer, useEffect } from 'react';

// get the data store to save all changes locally
const dataStore = window.dataStore;

import appReducer from './reducer.js';


const initialState = (function () {
	if (dataStore.storeExists()) {
		try {
			const data = dataStore.getData();
			if (data.lists && data.active_list_id) { return data; }
		} catch (e) {
			// pass
		}
	}
	return {
		active_list_id: 1,
		lists: [
			{
				id: 1,
				title: "To-Do",
				color: "#428af5",

				tasks: [
					{
						id: 1,
						title: "Clean the house",
						is_completed: false,

					},
					{
						id: 2,
						title: "Buy some stufs",
						is_completed: false,

					},
				]
			}
		]
	};

})();

// Create context sub component
export const GlobalContext = createContext(initialState);

// Create provider component

export function GlobalProvider({ children }) {

	const [state, dispatch] = useReducer(appReducer, initialState);

	// save state each change
	useEffect(() => {
		dataStore.saveData(state);
	}, [state]);

	function updateList({ id, title, color }) {
		dispatch({
			type: 'UPDATE_LIST',
			payload: {
				id, title, color
			}
		})
	}

	function addList({ title, color, tasks = [] }) {
		dispatch({
			type: 'ADD_LIST',
			payload: {
				title, color, tasks
			}
		})
	}

	function deleteListTasks(id) {
		dispatch({
			type: 'DELETE_LIST_TASKS',
			payload: id
		})
	}

	function deleteList(id) {
		dispatch({
			type: 'DELETE_LIST',
			payload: id
		})
	}

	function setActiveList(id) {
		dispatch({
			type: 'SET_ACTIVE_LIST',
			payload: id,
		})
	}

	function updateTask({ id, list_id, title }) {
		dispatch({
			type: 'UPDATE_TASK',
			payload: {
				id, list_id, title
			}
		})
	}

	function addTask({ id, list_id, title }) {
		dispatch({
			type: 'ADD_TASK',
			payload: {
				list_id, title
			}
		})
	}

	function deleteTask({ id, list_id }) {
		dispatch({
			type: 'DELETE_TASK',
			payload: {
				id, list_id
			}
		})
	}

	function completeTask({ id, list_id }) {
		dispatch({
			type: 'COMPLETE_TASK',
			payload: {
				id, list_id
			}
		})
	}

	function incompleteTask({ id, list_id }) {
		dispatch({
			type: 'INCOMPLETE_TASK',
			payload: {
				id, list_id
			}
		})
	}

	const getActiveList = () => state.lists.find(list => list.id === state.active_list_id);

	const providerValue = {
		active_list_id: state.active_list_id,
		lists: state.lists,

		getActiveList,
		setActiveList,

		updateList,
		addList,
		deleteListTasks,
		deleteList,

		updateTask,
		addTask,
		deleteTask,
		completeTask,
		incompleteTask

	}

	return (

		<GlobalContext.Provider value={providerValue} >
			{children}
		</GlobalContext.Provider>
	)
};
