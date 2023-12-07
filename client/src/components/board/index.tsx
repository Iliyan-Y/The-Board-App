"use client";
import { useState } from "react";

// const dragDefaultState = {
// 	parentIndex: -1,
// 	itemIndex: -1,
// };

const BoardComponent = () => {
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [draggedElement, setElement] = useState<any>();

	const [masterParent, setMasterParent] = useState(-1);
	const [masterChild, setMasterChild] = useState(-1);
	const [columns, setColumns] = useState([
		{ name: "Apply", tasks: [1] },
		{ name: "Interview", tasks: [] },
		{ name: "Rejected", tasks: [12, 2] },
	]);

	const columnStyle = "border w-3/12 text-center mx-1";

	const handleUpdateState = () => {
		console.log(selectedIndex);
		if (selectedIndex === masterParent) return;
		console.log(masterParent, masterChild);

		setColumns((state) => {
			const updatedLinks = state.map((item, index) => {
				//console.log(item, index, dragDefaultState);

				if (index === selectedIndex) {
					// add to the tasks
					const task = state[masterParent].tasks[masterChild];
					const newTaskArray = [...item.tasks, task];
					return { name: item.name, tasks: newTaskArray };
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
	};

	return (
		<div className="h-screen m-2">
			<h1>BOARD NAME HERE</h1>
			<div id="table-board" className="flex justify-evenly border h-5/6">
				{columns.map((c, parentIndex) => (
					<div
						style={{
							background: selectedIndex === parentIndex ? "hotpink" : "inherit",
						}}
						key={c && c.name}
						className={columnStyle}
						onDragOver={() => setSelectedIndex(parentIndex)}
						onDragEnd={() => {
							handleUpdateState();
							//setSelectedIndex(-1);
							// setDraggedElement(dragDefaultState)
						}}
					>
						<div className="border-b min-w-full py-5">{c ? c.name : ""}</div>
						{c &&
							c.tasks.map((t, itemIndex) => (
								<div
									draggable
									key={t}
									onDragStart={() => {
										console.log("SETTING IT UP", parentIndex, itemIndex);
										setMasterChild(itemIndex);
										setMasterParent(parentIndex);
									}}
									className="cursor-move"
								>
									This will be job
								</div>
							))}
					</div>
				))}
				{/* TODO: */}
				{/* <div className={columnStyle}>+</div> */}
			</div>
		</div>
	);
};

export default BoardComponent;
