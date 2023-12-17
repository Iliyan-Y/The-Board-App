import { useState } from "react";
import PlusButton from "../../common/buttons/plusButton";
import CreateTaskModal from "./view";
import { CreateTaskService } from "./services/create";

const CreateTask = ({ columnId }: { columnId: string }) => {
	const service = new CreateTaskService();
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<CreateTaskModal
				showModal={showModal}
				setShowModal={setShowModal}
				columnId={columnId}
				service={service}
			/>
			<PlusButton onClick={() => setShowModal(true)} />
		</>
	);
};

export default CreateTask;
