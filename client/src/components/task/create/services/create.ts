import axios from "axios";
import { CreateRequest, CreateTaskResponse } from "../models/create";
import { API } from "../../../../helpers/api";

export class CreateTaskService {
	async createTask(data: CreateRequest) {
		const response = await axios.post(API.task.CREATE, data);

		if (response.status === 201) {
			return response.data as CreateTaskResponse;
		}
		return null;
	}
}
