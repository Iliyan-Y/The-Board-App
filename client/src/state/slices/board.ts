import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface Board {
	name: string;
}

export interface BoardState {
	boardState: Board[];
}

// Initial state
const initialState: BoardState = {
	boardState: [],
};

// Actual Slice
export const boardSlice = createSlice({
	name: "boards",
	initialState,
	reducers: {
		setBoardState(state, action) {
			state.boardState = action.payload;
		},
	},
});

export const { setBoardState } = boardSlice.actions;

export const selectBoardState = (state: RootState) =>
	state.boardSlice.boardState;

export default boardSlice.reducer;
