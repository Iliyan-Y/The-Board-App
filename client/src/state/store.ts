import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import boardSlice from "./slices/board";
import taskSlice from "./slices/task";

// export const makeStore = () => {
// 	return configureStore({
// 		reducer: { boardSlice },
// 	});
// };

export const store = configureStore({
	reducer: {
		boardSlice,
		taskSlice,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	unknown,
	Action<string>
>;
// // Infer the type of makeStore
// export type AppStore = ReturnType<typeof makeStore>;
// // Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<AppStore["getState"]>;
// export type AppDispatch = AppStore["dispatch"];
