import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./state/store";
import AppWrapper from "./components/common/appWrapper";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<Provider store={store}>
			<AppWrapper>
				<App />
			</AppWrapper>
		</Provider>
	</StrictMode>
);
