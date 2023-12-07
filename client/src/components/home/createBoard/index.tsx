import { api } from "@/helpers/api";
import axios from "axios";

const CreateBoard = () => {
	const handleCreate = () => {
		axios
			.post(api + "/", {})
			.then((e) => console.log(e))
			.catch((e) => console.error(e));
	};

	return (
		<div className="m-auto">
			<h3>New Board</h3>
			<input
				type="text"
				placeholder="Name"
				className="input input-bordered w-full max-w-xs my-2"
			/>
			<button onClick={handleCreate} className="btn btn-wide center w-full">
				Create
			</button>
		</div>
	);
};

export default CreateBoard;
