import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

export class ReduxHooks {
	static useAppDispatch: () => AppDispatch = useDispatch;
	static useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
}
