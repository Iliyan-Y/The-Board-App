"use client";
import { api } from "@/helpers/api";
import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import BoardTask from "../task";

const BoardPage = () => {
	// TODO: refactor naming
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [masterParent, setMasterParent] = useState(-1);
	const [masterChild, setMasterChild] = useState(-1);
	const [columns, setColumns] = useState([
		{ name: "Apply", tasks: [{ id: "1", name: "some name" }] },
		{ name: "Interview", tasks: [] },
		{
			name: "Rejected",
			tasks: [
				{ id: "12", name: "some name 2" },
				{ id: "2", name: "some name 3" },
			],
		},
	]);

	const columnStyle = "border w-3/12 text-center mx-1";
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

	//TODO: Optimize using state ?
	//------------------
	// const getBoard = async () => {
	// 	axios
	// 		.get(`${api}/${id}`)
	// 		.then((res) => {
	// 			setColumns(res.data.columns);
	// 		})
	// 		.catch((e) => console.error(e));
	// };

	// useEffect(() => {
	// 	getBoard();
	// }, []);

	//------------------

	// TODO: extract functions and components
	return (
		<div className="h-screen m-2">
			<h1>BOARD NAME HERE</h1>
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
					</div>
				))}
				{/* TODO: add button for adding columns */}
				{/* <div className={columnStyle}>+</div> */}
			</div>
		</div>
	);
};

export default BoardPage;
