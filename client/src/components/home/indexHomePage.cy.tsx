import React from "react";
import HomePage from "./index";
import { Provider } from "react-redux";
import { store } from "../../state/store";
import "../../index.css";

describe("<HomePage />", () => {
	it("renders", () => {
		// see: https://on.cypress.io/mounting-react

		cy.mount(
			<Provider store={store}>
				<HomePage />
			</Provider>
		);
	});
});
