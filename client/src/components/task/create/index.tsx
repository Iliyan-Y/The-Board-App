import { useState } from "react";
import PlusButton from "../../common/buttons/plusButton";
import CreateTaskModal from "./modal";
import { api } from "../../../helpers/api";
import { CreateTaskService } from "./services/create";

const CreateTask = () => {
	const endpoints = { CREATE: api + "/task" };
	const service = new CreateTaskService(endpoints);
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			<CreateTaskModal
				showModal={showModal}
				setShowModal={setShowModal}
				service={service}
			/>
			<PlusButton onClick={() => setShowModal(true)} />
		</>
	);
};

export default CreateTask;
