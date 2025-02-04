import React, { useState } from "react";

import useStore from "@store/store";

import BaseButton from "./BaseButton";

import FileTextIcon from "@icon/FileTextIcon";
import MarkdownIcon from "@icon/MarkdownIcon";

const MarkdownModeButton = () => {
	const markdownMode = useStore((state) => state.markdownMode);
	const setMarkdownMode = useStore((state) => state.setMarkdownMode);

	return (
		<BaseButton
			icon={markdownMode ? <MarkdownIcon /> : <FileTextIcon />}
			onClick={() => {
				setMarkdownMode(!markdownMode);
			}}
		/>
	);
};

export default MarkdownModeButton;
