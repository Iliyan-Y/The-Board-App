export const apiRoot = import.meta.env.VITE_PUBLIC_API_BASE_PATH;

export const API = {
	task: {
		UPDATE: `${apiRoot}/task`,
		CREATE: `${apiRoot}/task`,
		GET_ALL_BY_COLUMN_ID: (columnId: string) => `${apiRoot}/task/${columnId}`,
	},
	board: {
		LIST: apiRoot,
		GET_BY_ID: (id: string) => `${apiRoot}/${id}`,
		CREATE: apiRoot,
	},
	webExtractor: {
		GET_PAGE: (taskId: string) => `${apiRoot}/task/${taskId}/get-page`,
	},
};
