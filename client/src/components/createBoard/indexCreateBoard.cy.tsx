import { Provider } from "react-redux";
import CreateBoard from "./index";
import { store } from "../../state/store";
import "../../index.css";

describe("<CreateBoard />", () => {
	it("renders", () => {
		// see: https://on.cypress.io/mounting-react
		cy.mount(
			<Provider store={store}>
				<CreateBoard />
			</Provider>
		);
	});
});
