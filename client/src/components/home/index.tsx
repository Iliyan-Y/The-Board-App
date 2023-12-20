import { useState } from "react";
import CreateBoard from "../board/createBoard";
import SidePanel from "./sidePanel";
import parse from "html-react-parser";
import axios from "axios";
import "./test.css";

const HomePage = () => {
	const [html, setHtml] = useState("<li>Item 1</li><li>Item 2</li>");

	const load = async () => {
		await axios
			.post("http://localhost:5120/WebScrapper")
			.then((r) => setHtml(r.data))
			.catch((e) => console.log(e));
	};

	const handleTextSelection = () => {
		const selection = window.getSelection();
		const selectedContent = selection?.toString();
		console.log(selectedContent);
	};

	return (
		<>
			<button className="btn" onClick={load}>
				Load
			</button>
			{/* <SidePanel />
		<CreateBoard /> */}

			<div
				onMouseUp={handleTextSelection}
				className="w-3/4 h-3/4 absolute bg-gray-500 top-28 left-10 overflow-auto"
			>
				{parse(html)}
			</div>
		</>
	);
};

export default HomePage;
