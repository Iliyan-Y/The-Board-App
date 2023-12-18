import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import axios from "axios";
import { API } from "../../../helpers/api";
import { CreateRequest, IBoardTask, TaskState } from "./model";

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
		selectTask(state, action) {
			state.selected = action.payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(updateTask.fulfilled, (state, action) => {
				// payload is the return value from the AsyncThunk function updateTask
				moveTaskToEnd(state.tasks, action.payload);
			})
			.addCase(updateTask.rejected, (_, action) => {
				console.log("Error while updating task: ", action.error.message);
			});
		builder
			.addCase(addTask.fulfilled, (state, action) => {
				state.tasks = [...state.tasks, action.payload];
			})
			.addCase(addTask.rejected, (_, action) => {
				console.log("Error while creating task: ", action.error.message);
			});
	},
});

export const { setTaskState, selectTask } = taskSlice.actions;

export const selectTaskState = (state: RootState) => state.taskSlice.tasks;

export const selectedTask = (state: RootState) => state.taskSlice.selected;

export default taskSlice.reducer;

export const addTask = createAsyncThunk(
	"tasks/add",
	async (task: CreateRequest) => {
		const response = await axios.post(API.task.CREATE, task);
		return response.data as IBoardTask;
	}
);

export const updateTask = createAsyncThunk(
	"tasks/update",
	async (task: IBoardTask) => {
		const response = await axios.put(API.task.UPDATE, task);
		return response.data;
	}
);

function moveTaskToEnd(tasks: IBoardTask[], updatedTask: IBoardTask) {
	const taskIndex = tasks.findIndex((x) => x.id === updatedTask.id);
	tasks.splice(taskIndex, 1);
	tasks.push(updatedTask);
}
