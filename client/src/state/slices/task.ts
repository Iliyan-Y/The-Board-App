import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IBoardTask {
	id: string;
	name: string;
	description: string;
	columnId: string;
}

export interface TaskState {
	tasks: IBoardTask[];
	selected: IBoardTask | null;
}

const initialState: TaskState = {
	tasks: [],
	selected: null,
};

export const taskSlice = createSlice({
	name: "boardTasks",
	initialState,
	reducers: {
		setTaskState(state, action) {
			state.tasks = action.payload;
		},
		addTask(state, action) {
			state.tasks = [...state.tasks, action.payload];
		},
		selectTask(state, action) {
			state.selected = action.payload;
		},
		moveTask(state, action) {
			const taskIndex = state.tasks.findIndex(
				(x) => x.id === state.selected?.id
			);
			const task = state.tasks[taskIndex];
			state.tasks.splice(taskIndex, 1);
			task.columnId = action.payload;
			state.tasks.push(task);
		},
	},
});

export const { setTaskState, addTask, selectTask, moveTask } =
	taskSlice.actions;

export const selectTaskState = (state: RootState) => state.taskSlice.tasks;

export const selectedTask = (state: RootState) => state.taskSlice.selected;

export default taskSlice.reducer;
