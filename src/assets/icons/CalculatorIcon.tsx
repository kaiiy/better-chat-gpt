import React from "react";

const CalculatorIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			fill="currentColor"
			viewBox="0 0 16 16"
			height="1em"
			width="1em"
			{...props}
		>
			<title>Calculator Icon</title>
			<path d="M2 2a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V2zm2 .5v2a.5.5 0 00.5.5h7a.5.5 0 00.5-.5v-2a.5.5 0 00-.5-.5h-7a.5.5 0 00-.5.5zm0 4v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5zM4.5 9a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM4 12.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5zM7.5 6a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM7 9.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5zm.5 2.5a.5.5 0 00-.5.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1zM10 6.5v1a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-1a.5.5 0 00-.5-.5h-1a.5.5 0 00-.5.5zm.5 2.5a.5.5 0 00-.5.5v4a.5.5 0 00.5.5h1a.5.5 0 00.5-.5v-4a.5.5 0 00-.5-.5h-1z" />
		</svg>
	);
};

export default CalculatorIcon;
