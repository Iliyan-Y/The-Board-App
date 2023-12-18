"use client";
import { useEffect } from "react";
import axios from "axios";
import { API } from "../../helpers/api";
import { useNavigate, useParams } from "react-router-dom";
import { Board, selectBoard, setBoardState } from "../../state/slices/board";
import { ReduxHooks } from "../../state/hooks";
import { getTasks } from "../../state/slices/task/task";
import TableView from "./tableView";
import BackButton from "../common/buttons/backButton";

const BoardTable = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const dispatch = ReduxHooks.useAppDispatch();
	const board = ReduxHooks.useAppSelector(selectBoard);

	const getBoard = async () => {
		if (!id) return console.error("Board id not found");
		try {
			const res = await axios.get(API.board.GET_BY_ID(id));
			if (res.data) {
				const boardRes = res.data as Board;
				dispatch(setBoardState(boardRes));
				dispatch(getTasks(boardRes.columns));
			}
		} catch (error) {
			console.error(error);
			navigate("/");
		}
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

	if (!board?.columns) return <div>Loading....</div>;

	return (
		<div className="h-screen m-2">
			<BackButton className="absolute top-2.5" onClick={handleGoBack} />
			<h1>{board.name}</h1>
			<TableView board={board} />
		</div>
	);
};

export default BoardTable;
