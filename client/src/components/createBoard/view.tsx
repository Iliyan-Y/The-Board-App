import { redirect } from "react-router-dom";
import { useEffect, useState } from "react";
import { ReduxHooks, useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectBoardState, setBoardState } from "../../state/slices/board";
import { CreateBoardService } from "./services";

interface CreateBoardViewProps {
	service: CreateBoardService;
}

const CreateBoardView = ({ service }: CreateBoardViewProps) => {
	const d = ReduxHooks.dispatch();
	const dispatch = d();
	// const dispatch2 = useAppDispatch;
	const boardState = ReduxHooks.appSelector()(selectBoardState);
	const [boardName, setBoardName] = useState("");

	const handleCreate = async () => {
		const res = await service.createBoard(boardName);
		if (res) dispatch(setBoardState(res));
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

export default CreateBoardView;