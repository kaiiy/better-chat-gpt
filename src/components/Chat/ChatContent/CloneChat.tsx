import useStore from "@store/store";
import React, { useState } from "react";

import { ChatInterface } from "@type/chat";

import TickIcon from "@icon/TickIcon";

const CloneChat = React.memo(() => {
	const setChats = useStore((state) => state.setChats);
	const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);

	const [cloned, setCloned] = useState<boolean>(false);

	const cloneChat = () => {
		const chats = useStore.getState().chats;

		if (chats) {
			const index = useStore.getState().currentChatIndex;
			let title = `Copy of ${chats[index].title}`;
			let i = 0;

			while (chats.some((chat) => chat.title === title)) {
				i += 1;
				title = `Copy ${i} of ${chats[index].title}`;
			}

			const clonedChat = JSON.parse(JSON.stringify(chats[index]));
			clonedChat.title = title;

			const updatedChats: ChatInterface[] = JSON.parse(JSON.stringify(chats));
			updatedChats.unshift(clonedChat);

			setChats(updatedChats);
			setCurrentChatIndex(useStore.getState().currentChatIndex + 1);
			setCloned(true);

			window.setTimeout(() => {
				setCloned(false);
			}, 3000);
		}
	};

	return (
		<button
			type="button"
			className="btn btn-neutral flex gap-1"
			onClick={cloneChat}
		>
			{cloned ? (
				<>
					<TickIcon /> Cloned
				</>
			) : (
				<>Clone Chat</>
			)}
		</button>
	);
});

export default CloneChat;
