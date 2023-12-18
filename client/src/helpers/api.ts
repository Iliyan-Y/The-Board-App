export const apiRoot = import.meta.env.VITE_PUBLIC_API_BASE_PATH;

export const API = {
	task: {
		UPDATE: `${apiRoot}/task`,
		CREATE: `${apiRoot}/task`,
	},
	board: {
		LIST: apiRoot,
		CREATE: apiRoot,
	},
};
