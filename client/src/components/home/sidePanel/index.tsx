import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Board } from "../../../state/slices/board";
import axios from "axios";
import { API } from "../../../helpers/api";

const SidePanel = () => {
	const [boards, setBoards] = useState<Board[]>([]);

	const getBoards = async () => {
		await axios.get(API.board.LIST).then((res) => setBoards(res.data));
	};

	useEffect(() => {
		const source = axios.CancelToken.source();
		getBoards();
		return () => {
			source.cancel();
		};
	}, []);

	return (
		<div className="h-full border-r-2 absolute w-60 text-center p-2">
			{boards.map((board) => (
				<>
					<Link to={`/${board.id}`}>{board.name}</Link>
					<br />
				</>
			))}
		</div>
	);
};

export default SidePanel;
