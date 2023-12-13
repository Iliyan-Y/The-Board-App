import { Dispatch, SetStateAction, useState } from "react";

const CreateTaskModal = ({
	showModal,
	setShowModal,
}: {
	showModal: boolean;
	setShowModal: Dispatch<SetStateAction<boolean>>;
}) => {
	const [taskName, setTaskName] = useState("");
	const [description, setDescription] = useState("");

	const handleSave = () => {
		console.log(taskName, description);
	};

	const handleClose = () => {
		resetFields();
		setShowModal(false);
	};

	const resetFields = () => {
		setTaskName("");
		setDescription("");
	};

	return (
		<div
			className="absolute w-3/4 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-double bg-gray-500/[0.95]"
			style={{ display: showModal ? "block" : "none" }}
		>
			<div className="flex flex-col h-full justify-center w-1/2 mx-auto">
				<h3 className="font-bold text-lg text-black/75">Create Task</h3>
				<input
					type="text"
					placeholder="Name"
					value={taskName}
					className="input input-bordered w-full max-w-xs mx-auto my-2"
					onChange={(e) => setTaskName(e.target.value)}
				/>
				<textarea
					className="textarea textarea-bordered mb-2"
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
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

export default CreateTaskModal;
