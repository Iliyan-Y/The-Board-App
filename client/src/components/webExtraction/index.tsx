import parse from "html-react-parser";
import "./index.css";
import { useState } from "react";
import axios from "axios";
import { API } from "../../helpers/api";

const WebExtractedPage = ({ html }: { html: string }) => {
	const [question, setQuestion] = useState("");

	const handleTextSelection = () => {
		const selection = window.getSelection();
		const selectedContent = selection?.toString();
		setQuestion((state) => state + `\n ${selectedContent}`);
	};

	const handleSendQuestion = async () => {
		await axios
			.post(API.AI.POST_QUESTION, {
				question,
				taskId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
				title: "string",
			})
			.then((res) => console.log(res))
			.catch((e) => console.error(e));
	};

	return (
		<div className="flex justify-around h-full mt-5">
			<div>
				<button className="btn" onClick={handleSendQuestion}>
					Send Question
				</button>

				<textarea
					className="textarea  w-full h-4/5 textarea-bordered mb-2"
					placeholder="Question"
					value={question}
					onChange={(e) => setQuestion(e.target.value)}
				/>
			</div>

			<div
				onMouseUp={handleTextSelection}
				//className="w-3/4 h-3/4 absolute bg-white top-28 left-10 overflow-auto"
				className="w-1/2 h-4/5 bg-white overflow-auto"
			>
				{parse(html)}
			</div>
		</div>
	);
};

export default WebExtractedPage;
