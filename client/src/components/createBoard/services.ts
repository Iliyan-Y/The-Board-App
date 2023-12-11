import axios from "axios";

class CreateRequest {
	constructor(public boardName: string) {}
}

interface createEndpoint {
	CREATE: string;
}

export class CreateBoardService {
	constructor(private endpoints: createEndpoint) {}
	async createBoard(boardName: string) {
		try {
			const res = await axios.post(
				this.endpoints.CREATE,
				new CreateRequest(boardName)
			);

			if (res.status === 201) {
				return res.data; // Todo: return data as board object;
			}
			return null;
		} catch (error) {
			throw error;
		}
	}
}
