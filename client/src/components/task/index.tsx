import { Dispatch, SetStateAction } from "react";

interface IBoardTaskProps {
	setMasterChild: Dispatch<SetStateAction<number>>;
	setMasterParent: Dispatch<SetStateAction<number>>;
	parentIndex: number;
}

interface IBoardTask {
	id: string;
	name: string;
	description: string;
	columnId: string;
}

const BoardTask = ({
	setMasterChild,
	setMasterParent,
	parentIndex,
}: IBoardTaskProps) => {
	const tasks: IBoardTask[] = [];
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
