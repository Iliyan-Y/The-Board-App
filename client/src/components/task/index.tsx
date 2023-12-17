import { ReduxHooks } from "../../state/hooks";
import {
	IBoardTask,
	selectTask,
	selectTaskState,
} from "../../state/slices/task";

interface IBoardTaskProps {
	columnId: string;
}

const BoardTask = ({ columnId }: IBoardTaskProps) => {
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
					className="cursor-move"
				>
					{task.name}
				</div>
			))}
		</>
	);
};

export default BoardTask;
