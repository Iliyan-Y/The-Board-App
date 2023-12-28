import { UpdateTaskPros } from ".";

const UpdateTaskOverview = ({ task, setUpdateTask }: UpdateTaskPros) => {
	const handleSave = async () => {
		handleClose();
	};

	const handleClose = () => {
		setUpdateTask(null);
	};
	return (
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
	);
};

export default UpdateTaskOverview;
