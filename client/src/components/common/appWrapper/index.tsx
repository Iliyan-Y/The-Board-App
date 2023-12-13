import ThemeSwitch from "../theme/switch";

const AppWrapper = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="flex flex-col h-screen">
			<ThemeSwitch />
			{children}
		</div>
	);
};

export default AppWrapper;
