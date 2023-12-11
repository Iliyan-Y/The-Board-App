import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { UnknownAction, Dispatch } from "redux";
import { BoardState } from "./slices/board";

// Use throughout your app instead of plain `useDispatch` and `useSelector`

// export const useAppDispatch: () => AppDispatch = useDispatch;
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export class ReduxHooks {
	private static useAppDispatch: () => AppDispatch = useDispatch;
	private static useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

	static dispatch() {
		return this.useAppDispatch;
	}

	static appSelector() {
		return this.useAppSelector;
	}
}
