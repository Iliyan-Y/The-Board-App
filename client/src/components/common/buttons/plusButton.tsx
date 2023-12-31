import { ButtonHTMLAttributes } from "react";

type GenericButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const PlusButton: React.FC<GenericButtonProps> = ({ ...props }) => {
	return (
		<button {...props} className="btn btn-square   ">
			<svg
				enableBackground="new 0 0 50 50"
				height="50px"
				id="Layer_1"
				version="1.1"
				viewBox="0 0 50 50"
				width="50px"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect fill="none" height="50" width="50" />
				<line
					fill="none"
					stroke="#808080"
					strokeMiterlimit="10"
					strokeWidth="4"
					x1="9"
					x2="41"
					y1="25"
					y2="25"
				/>
				<line
					fill="none"
					stroke="#808080"
					strokeMiterlimit="10"
					strokeWidth="4"
					x1="25"
					x2="25"
					y1="9"
					y2="41"
				/>
			</svg>
		</button>
	);
};

export default PlusButton;
