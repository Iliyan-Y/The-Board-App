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
}

const initialState: TaskState = {
	tasks: [],
};

export const taskSlice = createSlice({
	name: "boardTasks",
	initialState,
	reducers: {
		setTaskState(state, action) {
			state.tasks = action.payload;
		},
		setAddTask(state, action) {
			state.tasks = [...state.tasks, action.payload];
		},
	},
});

export const { setTaskState, setAddTask } = taskSlice.actions;

export const selectTaskState = (state: RootState) => state.taskSlice.tasks;

export default taskSlice.reducer;
