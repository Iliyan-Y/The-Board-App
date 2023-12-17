import { apiRoot } from "../../../helpers/api";
import { CreateBoardService } from "./services";
import CreateBoardView from "./view";

const CreateBoard = () => {
	const endpoints = { CREATE: apiRoot + "/" };
	const service = new CreateBoardService(endpoints);

	return <CreateBoardView service={service} />;
};

export default CreateBoard;
