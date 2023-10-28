import React from "react";
import useStore from "@store/store";
import { MessageInterface } from "@type/chat";
import { generateDefaultChat } from "@constants/chat";

const useInitializeNewChat = () => {
	const setChats = useStore((state) => state.setChats);
	const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);

	const InitializeNewChat = () => {
		setChats([generateDefaultChat()]);
		setCurrentChatIndex(0);
	};

	return InitializeNewChat;
};

export default useInitializeNewChat;
