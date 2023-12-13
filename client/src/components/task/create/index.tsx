import { useState } from "react";
import PlusButton from "../../common/buttons/plusButton";
import CreateTaskModal from "./view";
import { api } from "../../../helpers/api";
import { CreateTaskService } from "./services/create";

const CreateTask = ({ columnId }: { columnId: string }) => {
	const endpoints = { CREATE: api + "/task" };
	const service = new CreateTaskService(endpoints);
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
