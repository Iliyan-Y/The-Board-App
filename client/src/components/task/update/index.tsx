import { Dispatch, SetStateAction, useState } from "react";
import { IBoardTask } from "../../../state/slices/task/model";
import UpdateTaskOverview from "./overview";
import axios from "axios";
import { API } from "../../../helpers/api";
import { selectBoard } from "../../../state/slices/board";
import { ReduxHooks } from "../../../state/hooks";
import WebExtractedPage from "../../webExtraction/spikeIndex";

export interface UpdateTaskPros {
	task: IBoardTask | null;
	setUpdateTask: Dispatch<SetStateAction<IBoardTask | null>>;
}

const UpdateTaskModal = ({ task, setUpdateTask }: UpdateTaskPros) => {
	const board = ReduxHooks.useAppSelector(selectBoard);
	const [urlPreview, setUrlPreview] = useState<boolean>(false);
	const [extractedPageHtml, setExtractedPageHtml] = useState<string | null>(
		null
	);
	const [loading, setLoading] = useState<boolean>(false);

	const handleLoadExtractedPage = async () => {
		if (!task!.url) return;
		if (extractedPageHtml) return setUrlPreview(true);

		setLoading((_) => true);

		const response = await axios.get(API.webExtractor.GET_PAGE(task!.id), {
			params: { boardId: board?.id },
		});
		if (response.status === 200) {
			console.log(response.data.length);
			setExtractedPageHtml(response.data);
		}

		setUrlPreview(true);
		setLoading((_) => false);
	};

	return (
		<div
			className="absolute w-3/4 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-double bg-gray-500/[0.95]"
			style={{ display: task ? "block" : "none" }}
		>
			<div className="join">
				<button
					className="btn join-item "
					disabled={!urlPreview}
					onClick={() => setUrlPreview(false)}
				>
					Overview
				</button>
				<button
					className="btn join-item"
					disabled={urlPreview}
					onClick={handleLoadExtractedPage}
				>
					URL PREVIEW
				</button>
			</div>
			{urlPreview ? (
				<WebExtractedPage html={extractedPageHtml!} />
			) : (
				<UpdateTaskOverview task={task} setUpdateTask={setUpdateTask} />
			)}
		</div>
	);
};

export default UpdateTaskModal;
