import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface IBoardColumns {
	id: string;
	name: string;
}

export interface Board {
	id: string;
	name: string;
	columns: IBoardColumns[];
}

export interface BoardState {
	board: Board | null;
}

// Initial state
const initialState: BoardState = {
	board: null,
};

// Actual Slice
export const boardSlice = createSlice({
	name: "board",
	initialState,
	reducers: {
		setBoardState(
			state,
			action: {
				payload: Board | null;
				type: string;
			}
		) {
			state.board = action.payload;
		},
	},
});

export const { setBoardState } = boardSlice.actions;

export const selectBoard = (state: RootState) => state.boardSlice.board;

export default boardSlice.reducer;
