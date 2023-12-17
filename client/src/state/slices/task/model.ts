export interface IBoardTask {
	id: string;
	name: string;
	description: string;
	columnId: string;
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
