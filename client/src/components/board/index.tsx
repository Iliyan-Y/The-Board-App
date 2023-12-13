"use client";
import { useEffect, useState } from "react";
import BoardTask from "../task";
import CreateTask from "../task/create";
import axios from "axios";
import { api } from "../../helpers/api";
import { useNavigate, useParams } from "react-router-dom";

const columnStyle = "border w-3/12 text-center mx-1";

interface BoardColumn {
	id: string;
	name: string;
	tasks: IBoardTask[];
}

interface IBoardTask {
	id: string;
	name: string;
	description: string;
	columnId: string;
}

const BoardTable = () => {
	const navigate = useNavigate();
	const { id } = useParams();
	// TODO: refactor naming
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [masterParent, setMasterParent] = useState(-1);
	const [masterChild, setMasterChild] = useState(-1);
	const [columns, setColumns] = useState<BoardColumn[]>([]);

	// TODO: refactor split in smaller chunks
	const handleUpdateState = () => {
		console.log(selectedIndex);
		if (selectedIndex === masterParent) return;
		console.log(masterParent, masterChild);

		setColumns((state) => {
			const updatedLinks = state.map((item, index) => {
				if (index === selectedIndex) {
					// add to the tasks
					const task = state[masterParent].tasks[masterChild];
					const newTaskArray = [...item.tasks, task];
					return { ...item, tasks: newTaskArray };
				}

				if (index === masterParent) {
					// remove task at position index
					const newTaskArray = [...item.tasks];
					newTaskArray.splice(masterChild, 1);
					return { ...item, tasks: newTaskArray };
				}
				return item;
			});
			return updatedLinks;
		});

		setSelectedIndex(-1);
		//todo: reset dragging ?
	};

	//TODO: convert to custom hook
	//------------------
	const getBoard = async () => {
		await axios
			.get(`${api}/${id}`)
			.then((res) => {
				console.log(res.data);
				setColumns(
					res.data.columns.map((col) => {
						return { ...col, tasks: [] };
					})
				);
			})
			.catch((e) => {
				console.error(e);
				navigate("/");
			});
	};

	useEffect(() => {
		getBoard();
	}, []);

	//------------------

	if (columns.length < 1) return <div>Loading....</div>;

	// TODO: extract functions and components
	return (
		<div className="h-screen m-2">
			<h1>BOARD NAME HERE</h1>
			{/* TODO: extract in separate component */}
			<div id="table-board" className="flex justify-evenly border h-5/6">
				{columns.map((column, parentIndex) => (
					<div
						style={{
							background: selectedIndex === parentIndex ? "hotpink" : "inherit",
						}}
						key={column && column.name}
						className={columnStyle}
						onDragOver={() => setSelectedIndex(parentIndex)}
						onDragEnd={handleUpdateState}
					>
						<div className="border-b min-w-full py-5">
							{column ? column.name : ""}
						</div>
						<BoardTask
							tasks={column.tasks}
							setMasterChild={setMasterChild}
							setMasterParent={setMasterParent}
							parentIndex={parentIndex}
						/>
						<CreateTask columnId={column.id} />
					</div>
				))}
				{/* TODO: add button for adding columns */}
				{/* <div className={columnStyle}>+</div> */}
			</div>
		</div>
	);
};

export default BoardTable;
