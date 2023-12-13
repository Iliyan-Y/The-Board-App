export class CreateRequest {
	constructor(public name: string, public description?: string) {
		// (this.model = model), (this.status = status);
	}
}

export interface CreateTaskResponse {
	id: string;
	name: string;
	description?: string;
}
