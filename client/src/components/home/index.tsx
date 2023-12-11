import ThemeSwitch from "../common/theme/switch";
import CreateBoard from "../createBoard";

const HomePage = () => {
	return (
		<div className="flex flex-col h-screen">
			<ThemeSwitch />
			<CreateBoard />
		</div>
	);
};

export default HomePage;
