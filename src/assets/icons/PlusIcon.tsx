import React from "react";

const PlusIcon = ({ className }: { className?: string }) => {
	return (
		<svg
			stroke="currentColor"
			fill="none"
			strokeWidth="2"
			viewBox="0 0 24 24"
			strokeLinecap="round"
			strokeLinejoin="round"
			className={className ? className : "h-4 w-4"}
			height="1em"
			width="1em"
			xmlns="http://www.w3.org/2000/svg"
		>
			<title>Plus Icon </title>
			<line x1="12" y1="5" x2="12" y2="19" />
			<line x1="5" y1="12" x2="19" y2="12" />
		</svg>
	);
};

export default PlusIcon;
