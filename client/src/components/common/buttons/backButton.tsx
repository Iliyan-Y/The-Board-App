import { ButtonHTMLAttributes } from "react";

type GenericButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const BackButton: React.FC<GenericButtonProps> = ({ ...props }) => {
	const extendedStyle = props.className;
	delete props.className;

	return (
		<button
			className={"btn btn-square btn-outline " + extendedStyle}
			{...props}
		>
			<svg
				height="16px"
				version="1.1"
				viewBox="0 0 16 16"
				width="16px"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title />
				<desc />
				<defs />
				<g
					fill="none"
					fillRule="evenodd"
					id="Page-1"
					stroke="none"
					strokeWidth="1"
				>
					<g
						fill="#808080"
						id="Core"
						transform="translate(-424.000000, -4.000000)"
					>
						<g id="arrow-back" transform="translate(424.000000, 4.000000)">
							<path
								d="M16,7 L3.8,7 L9.4,1.4 L8,0 L0,8 L8,16 L9.4,14.6 L3.8,9 L16,9 L16,7 L16,7 Z"
								id="Shape"
							/>
						</g>
					</g>
				</g>
			</svg>
		</button>
	);
};

export default BackButton;
