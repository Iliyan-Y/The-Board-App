import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import axios from "axios";
import { api } from "../../helpers/api";

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
	extraReducers(builder) {
		builder
			.addCase(updateTask.pending, (state, action) => {
				console.log("Pending update...");
			})
			.addCase(updateTask.fulfilled, (state, action) => {
				console.log(action.payload);
				const taskIndex = state.tasks.findIndex(
					(x) => x.id === state.selected?.id
				);
				state.tasks.splice(taskIndex, 1);
				state.tasks.push(action.payload);
			})
			.addCase(updateTask.rejected, (state, action) => {
				console.log("Error: ", action.error.message);
			});
	},
});

export const { setTaskState, addTask, selectTask, moveTask } =
	taskSlice.actions;

export const selectTaskState = (state: RootState) => state.taskSlice.tasks;

export const selectedTask = (state: RootState) => state.taskSlice.selected;

export default taskSlice.reducer;

// TODO convert to async dispatch
// const updateTaskInDb = async (task: IBoardTask, selectedColumn: string) => {
// 	await axios
// 		.put(`${api}/task`, { ...task, columnId: selectedColumn })
// 		.catch((e) => console.log(e));
// };

export const updateTask = createAsyncThunk(
	"tasks/update",
	async (task: IBoardTask) => {
		const response = await axios.put(`${api}/task`, task);
		return response.data;
	}
);
