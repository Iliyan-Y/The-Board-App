import React from "react";
import HomePage from "./index";
import { Provider } from "react-redux";
import { store } from "../../state/store";
import "../../index.css";

const render = () =>
	cy.mount(
		<Provider store={store}>
			<HomePage />
		</Provider>
	);

describe("<HomePage />", () => {
	it("renders h3 title", () => {
		render();
		cy.get("h3").should("contains.text", "New Board");
	});

	it("change input text", () => {
		render();
		cy.get('input[placeholder="Name"]').type("Kitty");
	});

	it("change click the buutton", () => {
		render();
		cy.get("button").contains("Create");
	});
});
