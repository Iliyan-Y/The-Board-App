import { Dispatch, SetStateAction } from "react";
import { IBoardTask } from "../../state/slices/task";

interface IBoardTaskProps {
	tasks: IBoardTask[];
	setMasterChild: Dispatch<SetStateAction<number>>;
	setMasterParent: Dispatch<SetStateAction<number>>;
	parentIndex: number;
}

const BoardTask = ({
	tasks,
	setMasterChild,
	setMasterParent,
	parentIndex,
}: IBoardTaskProps) => {
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
					{task.name}
				</div>
			))}
		</>
	);
};

export default BoardTask;
