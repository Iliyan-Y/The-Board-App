import axios from "axios";
import { redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../helpers/api";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectBoardState, setBoardState } from "../../state/slices/board";

class CreateRequest {
	constructor(public boardName: string) {}
}

const CreateBoard = () => {
	const dispatch = useAppDispatch();
	const boardState = useAppSelector(selectBoardState);
	const [boardName, setBoardName] = useState("");

	const handleCreate = () => {
		axios
			.post(api + "/", new CreateRequest(boardName))
			.then((e) => {
				if (e.status === 201) {
					dispatch(setBoardState(e.data));
				}
			})
			.catch((e) => console.error(e));
	};

	useEffect(() => {
		// TODO: refactor to allow multiple  board s
		if (boardState.length >= 1) redirect("/" + boardState[0].id);
	}, [boardState]);

	return (
		<div className="m-auto">
			<h3>New Board</h3>
			<input
				type="text"
				placeholder="Name"
				value={boardName}
				className="input input-bordered w-full max-w-xs my-2"
				onChange={(e) => setBoardName(e.target.value)}
			/>
			<button onClick={handleCreate} className="btn btn-wide center w-full">
				Create
			</button>
		</div>
	);
};

export default CreateBoard;
