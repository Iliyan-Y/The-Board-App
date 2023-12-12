import HomePage from "./index";
import { Provider } from "react-redux";
import { store } from "../../state/store";
import "../../index.css";
import { CreateBoardService } from "../createBoard/services";
import { ReduxHooks } from "../../state/hooks";

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

	it("should call the onClick function", () => {
		const onClick = cy
			.stub(CreateBoardService.prototype, "createBoard")
			.as("CreateBTN");

		render();

		cy.get(`button`)
			.contains("Create")
			.click()
			.then(() => {
				expect(onClick).to.be.called; // succeeds
			});
	});

	it("should call the set the state on succsessfull api call", () => {
		cy.stub(CreateBoardService.prototype, "createBoard").returns({
			some: "data",
		});

		const dispatch = cy.stub(ReduxHooks, "useAppDispatch").returns(() => {
			return () => {};
		});

		render();

		cy.get(`button`)
			.contains("Create")
			.click()
			.then(() => {
				expect(dispatch).to.be.called; // succeeds
			});
	});
});
