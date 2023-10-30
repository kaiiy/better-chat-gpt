import { generateDefaultChat } from "@constants/chat";
import useStore from "@store/store";

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
