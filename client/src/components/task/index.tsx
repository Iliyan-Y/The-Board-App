import { Dispatch, SetStateAction } from "react";
import { Task } from "../../state/slices/board";

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
