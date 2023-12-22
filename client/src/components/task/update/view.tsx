import { Dispatch, SetStateAction } from "react";
import { IBoardTask } from "../../../state/slices/task/model";

interface CreateTaskPros {
	task: IBoardTask | null;
	setUpdateTask: Dispatch<SetStateAction<IBoardTask | null>>;
}

const UpdateTaskModal = ({ task, setUpdateTask }: CreateTaskPros) => {
	const handleSave = async () => {
		handleClose();
	};

	const handleClose = () => {
		setUpdateTask(null);
	};

	return (
		<div
			className="absolute w-3/4 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-double bg-gray-500/[0.95]"
			style={{ display: task ? "block" : "none" }}
		>
			<div className="join">
				<button className="btn join-item " disabled onClick={handleClose}>
					Overview
				</button>
				<button className="btn join-item" onClick={handleClose}>
					URL PREVIEW
				</button>
			</div>

			<div className="flex flex-col h-full justify-center w-1/2 mx-auto">
				<input
					type="text"
					placeholder="Name"
					value={task?.name}
					className="input input-bordered w-full max-w-xs mx-auto my-2"
					disabled
				/>
				<input
					type="text"
					placeholder="URL"
					className="input input-bordered w-full max-w-xs mx-auto my-2"
					value={task?.url}
					disabled
				/>
				<textarea
					className="textarea textarea-bordered mb-2"
					placeholder="Description"
					value={task?.description}
					disabled
				/>
				<div className="">
					<button className="btn mr-2" onClick={handleSave}>
						Save
					</button>
					<button onClick={handleClose} className="btn">
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default UpdateTaskModal;
