// @ts-nocheck
import React, { useState, useEffect } from "react";

const Draggable = ({ initialPos, children }) => {
	const [pos, setPos] = useState(initialPos);
	const [dragging, setDragging] = useState(false);
	const [rel, setRel] = useState(null);

	useEffect(() => {
		const onMouseMove = (e) => {
			if (!dragging) return;
			setPos({
				x: e.pageX - rel.x,
				y: e.pageY - rel.y,
			});
			e.stopPropagation();
			e.preventDefault();
		};

		const onMouseUp = (e) => {
			setDragging(false);
			e.stopPropagation();
			e.preventDefault();
		};

		if (dragging) {
			window.addEventListener("mousemove", onMouseMove);
			window.addEventListener("mouseup", onMouseUp);
		}

		return () => {
			window.removeEventListener("mousemove", onMouseMove);
			window.removeEventListener("mouseup", onMouseUp);
		};
	}, [dragging, rel]);

	const onMouseDown = (e) => {
		if (e.button !== 0) return;
		const pos = e.target.getBoundingClientRect();
		setDragging(true);
		setRel({
			x: e.pageX - pos.left,
			y: e.pageY - pos.top,
		});
		e.stopPropagation();
		e.preventDefault();
	};

	return (
		<div
			onMouseDown={onMouseDown}
			style={{
				left: pos.x + "px",
				top: pos.y + "px",
				position: "absolute",
				cursor: "grab",
			}}
		>
			{children}
		</div>
	);
};

Draggable.defaultProps = {
	initialPos: { x: 0, y: 0 },
};

export default Draggable;
