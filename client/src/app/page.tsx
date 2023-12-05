"use client";

import ThemeSwitch from "@/components/common/theme/switch";
import CreateBoard from "@/components/home/createBoard";

export default function Home() {
	return (
		<main>
			<div className="flex flex-col h-screen">
				<ThemeSwitch />
				<CreateBoard />
			</div>
		</main>
	);
}
