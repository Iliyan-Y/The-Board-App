"use client";
import { useEffect, useState } from "react";
import BoardTask from "../task";
import CreateTask from "../task/create";
import axios from "axios";
import { api } from "../../helpers/api";
import { useNavigate, useParams } from "react-router-dom";
import {
	Board,
	IBoardColumns,
	selectBoard,
	setBoardState,
} from "../../state/slices/board";
import { ReduxHooks } from "../../state/hooks";
import { selectTaskState, setTaskState } from "../../state/slices/task";

const columnStyle = "border w-3/12 text-center mx-1, overflow-y-auto";

const BoardTable = () => {
	const navigate = useNavigate();
	const dispatch = ReduxHooks.useAppDispatch();
	const { id } = useParams();
	const board = ReduxHooks.useAppSelector(selectBoard);
	const columns = board?.columns;
	const tasks = ReduxHooks.useAppSelector(selectTaskState);

	// TODO: refactor naming
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [masterParent, setMasterParent] = useState(-1);
	const [masterChild, setMasterChild] = useState(-1);

	// TODO: refactor split in smaller chunks
	// const handleUpdateState = () => {
	// 	console.log(selectedIndex);
	// 	if (selectedIndex === masterParent) return;
	// 	console.log(masterParent, masterChild);

	// 	setTasks((state) => {
	// 		const updatedLinks = state.map((item, index) => {
	// 			if (index === selectedIndex) {
	// 				// add to the tasks
	// 				const task = state[masterParent].tasks[masterChild];
	// 				const newTaskArray = [...item.tasks, task];
	// 				return { ...item, tasks: newTaskArray };
	// 			}

	// 			if (index === masterParent) {
	// 				// remove task at position index
	// 				const newTaskArray = [...item.tasks];
	// 				newTaskArray.splice(masterChild, 1);
	// 				return { ...item, tasks: newTaskArray };
	// 			}
	// 			return item;
	// 		});
	// 		return updatedLinks;
	// 	});

	// 	setSelectedIndex(-1);
	// 	//todo: reset dragging ?
	// };

	//TODO: convert to custom hook
	//------------------
	const getBoard = async () => {
		if (board) return;
		try {
			const res = await axios.get(`${api}/${id}`);
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
		const res = await axios.get(`${api}/task/${columnId}`);
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
		const cancelToken = axios.CancelToken.source();
		getBoard();
		return () => {
			cancelToken.cancel();
		};
	}, []);

	//------------------

	if (!columns || columns.length < 1) return <div>Loading....</div>;

	// TODO: extract functions and components
	return (
		<div className="h-screen m-2">
			<h1>BOARD NAME HERE</h1>
			{/* TODO: extract in separate component */}
			<div id="table-board" className="flex justify-evenly border h-5/6">
				{columns &&
					columns.map((column, parentIndex) => (
						<div
							style={{
								background:
									selectedIndex === parentIndex ? "hotpink" : "inherit",
							}}
							key={column && column.name}
							className={columnStyle}
							onDragOver={() => setSelectedIndex(parentIndex)}
							// TODO:
							// onDragEnd={handleUpdateState}
						>
							<div className="border-b min-w-full flex justify-between">
								<CreateTask columnId={column.id} />
								<h3 className="flex self-center">
									{column ? column.name : ""}
								</h3>
								<button className="btn btn-square">...</button>
							</div>
							<BoardTask
								tasks={tasks.filter((t) => t.columnId === column.id)}
								setMasterChild={setMasterChild}
								setMasterParent={setMasterParent}
								parentIndex={parentIndex}
							/>
						</div>
					))}
				{/* TODO: add button for adding columns */}
				{/* <div className={columnStyle}>+</div> */}
			</div>
		</div>
	);
};

export default BoardTable;
