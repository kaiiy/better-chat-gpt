import React from "react";

const MenuIcon = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			stroke="currentColor"
			fill="none"
			strokeWidth="1.5"
			viewBox="0 0 24 24"
			strokeLinecap="round"
			strokeLinejoin="round"
			className="h-6 w-6"
			height="1em"
			width="1em"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<title>Menu Icon</title>
			<line x1="3" y1="12" x2="21" y2="12" />
			<line x1="3" y1="6" x2="21" y2="6" />
			<line x1="3" y1="18" x2="21" y2="18" />
		</svg>
	);
};

export default MenuIcon;
