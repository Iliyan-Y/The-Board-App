const CreateBoard = () => {
	return (
		<div className="m-auto">
			<h3>New Board</h3>
			<input
				type="text"
				placeholder="Name"
				className="input input-bordered w-full max-w-xs my-2"
			/>
			<button className="btn btn-wide center w-full">Create</button>
		</div>
	);
};

export default CreateBoard;
