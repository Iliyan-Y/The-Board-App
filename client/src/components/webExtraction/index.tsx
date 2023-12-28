import parse from "html-react-parser";
import "./test.css";

const WebExtractedPage = ({ html }: { html: string }) => {
	const handleTextSelection = () => {
		const selection = window.getSelection();
		const selectedContent = selection?.toString();
		console.log(selectedContent);
	};

	return (
		<div
			onMouseUp={handleTextSelection}
			className="w-3/4 h-3/4 absolute bg-white top-28 left-10 overflow-auto"
		>
			{parse(html)}
		</div>
	);
};

export default WebExtractedPage;
