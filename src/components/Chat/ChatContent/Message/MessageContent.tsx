import useStore from "@store/store";
import React, { useState } from "react";

import ContentView from "./View/ContentView";
import EditView from "./View/EditView";

const MessageContent = ({
	role,
	content,
	messageIndex,
	sticky = false,
}: {
	role: string;
	content: string;
	messageIndex: number;
	sticky?: boolean;
}) => {
	const [isEdit, setIsEdit] = useState<boolean>(sticky);
	const advancedMode = useStore((state) => state.advancedMode);

	return (
		<div className="relative flex flex-col gap-2 md:gap-3 lg:w-[calc(100%-115px)]">
			{advancedMode && <div className="flex flex-grow flex-col gap-3" />}
			{isEdit ? (
				<EditView
					content={content}
					setIsEdit={setIsEdit}
					messageIndex={messageIndex}
					sticky={sticky}
				/>
			) : (
				<ContentView
					role={role}
					content={content}
					setIsEdit={setIsEdit}
					messageIndex={messageIndex}
				/>
			)}
		</div>
	);
};

export default MessageContent;
