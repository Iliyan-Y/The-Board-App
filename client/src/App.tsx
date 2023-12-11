import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/home";

const routes = [
	{
		path: "/",
		element: <HomePage />,
	},
];

function App() {
	return <RouterProvider router={createBrowserRouter(routes)} />;
}

export default App;
