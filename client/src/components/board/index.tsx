"use client";
import { useEffect } from "react";
import axios from "axios";
import { apiRoot } from "../../helpers/api";
import { useNavigate, useParams } from "react-router-dom";
import {
	Board,
	IBoardColumns,
	selectBoard,
	setBoardState,
} from "../../state/slices/board";
import { ReduxHooks } from "../../state/hooks";
import { setTaskState } from "../../state/slices/task/task";
import TableView from "./tableView";
import BackButton from "../common/buttons/backButton";

const BoardTable = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = ReduxHooks.useAppDispatch();
	const board = ReduxHooks.useAppSelector(selectBoard);

	//TODO: convert to custom hook
	//------------------
	const getBoard = async () => {
		try {
			const res = await axios.get(`${apiRoot}/${id}`);
			if (res.data) {
				const boardRes = res.data as Board;

				const tasks = await getAllTasks(boardRes.columns);

				dispatch(setBoardState(boardRes));
				dispatch(setTaskState(tasks));
			}
		} catch (error) {
			console.error(error);
			navigate("/");
		}
	};

	const getTasks = async (columnId: string) => {
		const res = await axios.get(`${apiRoot}/task/${columnId}`);
		return res.data;
	};

	const getAllTasks = async (cols: IBoardColumns[]) => {
		let t: IBoardColumns[] = [];
		for (const col of cols) {
			const data = await getTasks(col.id);
			t = [...t, ...data];
		}
		return t;
	};

	useEffect(() => {
		const source = axios.CancelToken.source();
		getBoard();
		return () => {
			source.cancel();
		};
	}, [id]);

	const handleGoBack = () => {
		dispatch(setBoardState(null));
		navigate("/");
	};

	//------------------

	if (!board?.columns) return <div>Loading....</div>;

	return (
		<div className="h-screen m-2">
			<BackButton className="absolute top-2.5" onClick={handleGoBack} />
			<h1>BOARD NAME HERE</h1>
			<TableView board={board} />
		</div>
	);
};

export default BoardTable;
