import MoonIcon from "./moonIcon";
import SunIcon from "./sunIcon";

const ThemeSwitch = () => {
	// TODO: Refactor to use redux
	function toggleTheme() {
		const htmlElement = document.documentElement;
		const currentTheme = htmlElement.getAttribute("data-theme");
		const newTheme = currentTheme === "black" ? "light" : "black";
		htmlElement.setAttribute("data-theme", newTheme);
	}

	return (
		<div className="flex justify-end p-2 m-2">
			<label className="swap swap-rotate">
				{/* this hidden checkbox controls the state */}
				<input type="checkbox" onChange={toggleTheme} />
				<SunIcon />
				<MoonIcon />
			</label>
		</div>
	);
};

export default ThemeSwitch;
