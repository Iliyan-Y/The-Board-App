import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/home";
import BoardPage from "./components/board";

const routes = [
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/:id",
		element: <BoardPage />,
	},
];

function App() {
	return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default App;
