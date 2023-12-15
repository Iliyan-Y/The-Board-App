import { IBoardColumns } from "../../state/slices/board";
import CreateTask from "../task/create";

const TableHead = ({ column }: { column: IBoardColumns }) => {
	return (
		<div className="border-b min-w-full flex justify-between">
			<CreateTask columnId={column.id} />
			<h3 className="flex self-center">{column.name}</h3>
			<button className="btn btn-square">...</button>
		</div>
	);
};

export default TableHead;
