import { useState } from "react";
import PlusButton from "../../common/buttons/plusButton";
import CreateTaskModal from "./view";

const CreateTask = ({ columnId }: { columnId: string }) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<CreateTaskModal
				showModal={showModal}
				setShowModal={setShowModal}
				columnId={columnId}
			/>
			<PlusButton onClick={() => setShowModal(true)} />
		</>
	);
};

export default CreateTask;
