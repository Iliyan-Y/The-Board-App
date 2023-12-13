import axios from "axios";
import { ITaskEndpoints } from "./endpoints";
import { CreateRequest, CreateTaskResponse } from "../models/create";

export class CreateTaskService {
	constructor(private endpoints: ITaskEndpoints) {}

	async createTask(data: CreateRequest) {
		const response = await axios.post(this.endpoints.CREATE, data);

		if (response.status === 201) {
			return response.data as CreateTaskResponse;
		}
		return null;
	}
}
