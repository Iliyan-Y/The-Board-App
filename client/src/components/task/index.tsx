import { useState } from "react";
import { ReduxHooks } from "../../state/hooks";
import { IBoardTask } from "../../state/slices/task/model";
import { selectTask, selectTaskState } from "../../state/slices/task/task";
import UpdateTaskModal from "./update";

interface IBoardTaskProps {
	columnId: string;
}

const BoardTask = ({ columnId }: IBoardTaskProps) => {
	const [updateTask, setUpdateTask] = useState<IBoardTask | null>(null);
	const tasks = ReduxHooks.useAppSelector(selectTaskState).filter(
		(task) => task.columnId === columnId
	);
	const dispatch = ReduxHooks.useAppDispatch();
	const handleOnDragStart = (task: IBoardTask) => {
		dispatch(selectTask(task));
	};
	return (
		<>
			{tasks.map((task) => (
				<div
					draggable
					key={task.id}
					onDragStart={() => handleOnDragStart(task)}
					onClick={() => setUpdateTask(task)}
					className="cursor-pointer"
				>
					{task.name}
				</div>
			))}
			<UpdateTaskModal task={updateTask} setUpdateTask={setUpdateTask} />
		</>
	);
};

export default BoardTask;
