import parse from "html-react-parser";
import "./index.css";
import { useState } from "react";
import axios from "axios";
import { API } from "../../helpers/api";

const WebExtractedPage = ({ html }: { html: string }) => {
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState<string | null>(null);

	const handleTextSelection = () => {
		const selection = window.getSelection();
		const selectedContent = selection?.toString();
		setQuestion((state) => state + `\n ${selectedContent}`);
	};

	const handleSendQuestion = async () => {
		await axios
			.post(API.AI.POST_QUESTION, { question })
			.then((res) => {
				console.log(res.data);
				setAnswer(res.data);
			})
			.catch((e) => console.error(e));
	};

	return (
		<div className="flex justify-around h-full mt-5">
			{answer ? (
				<div>
					<button className="btn" onClick={() => setAnswer(null)}>
						Save Answer
					</button>
					<button className="btn" onClick={() => setAnswer(null)}>
						Ask Again
					</button>
					<p>
						{answer.split("\n").map((n) => (
							<p>{n}</p>
						))}
					</p>
				</div>
			) : (
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
			)}

			<div
				onMouseUp={handleTextSelection}
				className="w-1/2 h-4/5 bg-white overflow-auto"
				style={{ display: answer ? "none" : "block" }}
			>
				{parse(html)}
			</div>
		</div>
	);
};

export default WebExtractedPage;
