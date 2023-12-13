import { useState } from "react";
import PlusButton from "../../common/buttons/plusButton";
import CreateTaskModal from "./modal";

const CreateTask = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<CreateTaskModal showModal={showModal} setShowModal={setShowModal} />
			<PlusButton onClick={() => setShowModal(true)} />
		</>
	);
};

export default CreateTask;
