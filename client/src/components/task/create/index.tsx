import { useState } from "react";
import PlusButton from "../../common/buttons/plusButton";

const CreateTask = () => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
			{/* <button className="btn" onClick={()=>document.getElementById('my_modal_5').showModal()}>open modal</button> */}
			<div
				className="absolute w-3/4 h-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 border border-double bg-gray-500/[0.9]"
				style={{ display: showModal ? "block" : "none" }}
			>
				<div className="flex flex-col h-full justify-center">
					<h3 className="font-bold text-lg">Hello!</h3>
					<p className="py-4">
						Press ESC key or click the button below to close
					</p>
					<div className="">
						{/* if there is a button in form, it will close the modal */}
						<button onClick={() => setShowModal(false)} className="btn">
							Close
						</button>
					</div>
				</div>
			</div>
			<PlusButton onClick={() => setShowModal(true)} />
		</>
	);
};

export default CreateTask;
