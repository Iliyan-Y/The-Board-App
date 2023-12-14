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
	boardState: Board | null;
}

// Initial state
const initialState: BoardState = {
	boardState: null,
};

// Actual Slice
export const boardSlice = createSlice({
	name: "boards",
	initialState,
	reducers: {
		setBoardState(
			state,
			action: {
				payload: Board;
				type: string;
			}
		) {
			state.boardState = action.payload;
		},
	},
});

export const { setBoardState } = boardSlice.actions;

export const selectBoardState = (state: RootState) =>
	state.boardSlice.boardState;

export default boardSlice.reducer;
