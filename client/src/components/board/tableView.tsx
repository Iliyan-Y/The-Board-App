import { useState } from "react";
import { ReduxHooks } from "../../state/hooks";
import { Board } from "../../state/slices/board";
import { moveTask, selectedTask } from "../../state/slices/task";
import BoardTask from "../task";
import TableHead from "./tableHeadView";
import axios from "axios";
import { api } from "../../helpers/api";

interface TableViewProps {
	board: Board;
}

const TableView = ({ board }: TableViewProps) => {
	const dispatch = ReduxHooks.useAppDispatch();
	const columns = board?.columns;
	const [selectedColumn, setSelectedColumn] = useState("");
	const task = ReduxHooks.useAppSelector(selectedTask);

	const handleOnDragOver = (
		e: React.DragEvent<HTMLDivElement>,
		columnId: string
	) => {
		// Disable default allow the component to handle onDrop event
		e.preventDefault();
		setSelectedColumn(columnId);
	};

	const handleOnDrop = () => {
		//TODO: record the change in the DB
		updateTaskInDb();
		dispatch(moveTask(selectedColumn));
		setSelectedColumn("");
	};

	const updateTaskInDb = async () => {
		await axios
			.put(`${api}/task`, { ...task, columnId: selectedColumn })
			.catch((e) => console.log(e));
	};

	return (
		<div id="table-board" className="flex justify-evenly border h-5/6">
			{columns &&
				columns.map((column) => (
					<div
						style={{
							background: selectedColumn === column.id ? "hotpink" : "inherit",
						}}
						key={column.id}
						className="border w-3/12 text-center mx-1, overflow-y-auto"
						onDragOver={(e) => handleOnDragOver(e, column.id)}
						onDrop={handleOnDrop}
					>
						<TableHead column={column} />
						<BoardTask columnId={column.id} />
					</div>
				))}
		</div>
	);
};

export default TableView;