import { Task } from "@/state/slices/board";
import { Dispatch, SetStateAction } from "react";

interface IBoardTask {
	tasks: Task[];
	setMasterChild: Dispatch<SetStateAction<number>>;
	setMasterParent: Dispatch<SetStateAction<number>>;
	parentIndex: number;
}

const BoardTask = ({
	tasks,
	setMasterChild,
	setMasterParent,
	parentIndex,
}: IBoardTask) => {
	return (
		<>
			{tasks.map((task, itemIndex) => (
				<div
					draggable
					key={task.id}
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
		</>
	);
};

export default BoardTask;
