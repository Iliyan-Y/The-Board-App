import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/home";
import BoardTable from "./components/board";

const routes = [
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/:id",
		element: <BoardTable />,
	},
];

function App() {
	return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default App;
