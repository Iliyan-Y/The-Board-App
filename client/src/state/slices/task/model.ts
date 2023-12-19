export interface IBoardTask {
	id: string;
	name: string;
	description: string;
	columnId: string;
	created_at: string;
	updated_at: string;
}

export interface TaskState {
	tasks: IBoardTask[];
	selected: IBoardTask | null;
}

export class CreateRequest {
	constructor(
		public name: string,
		public columnId: string,
		public description?: string
	) {}
}
