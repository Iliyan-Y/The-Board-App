import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ReduxHooks } from "../../state/hooks";
import { selectBoardState, setBoardState } from "../../state/slices/board";
import { CreateBoardService } from "./services";

interface CreateBoardViewProps {
	service: CreateBoardService;
}

const CreateBoardView = ({ service }: CreateBoardViewProps) => {
	const navigate = useNavigate();
	const dispatch = ReduxHooks.useAppDispatch();
	const boardState = ReduxHooks.useAppSelector(selectBoardState);
	const [boardName, setBoardName] = useState("");

	const handleCreate = async () => {
		const res = await service.createBoard(boardName);
		if (res) dispatch(setBoardState(res));
	};

	// TODO: refactor to allow multiple  board s
	if (boardState) return navigate("/" + boardState.id);

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
