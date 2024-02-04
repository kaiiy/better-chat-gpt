import useStore from "@store/store";
import { useEffect } from "react";

import Chat from "@components/Chat";
import Menu from "@components/Menu";

import Toast from "@components/Toast";
import useInitializeNewChat from "@hooks/useInitializeNewChat";

const App = () => {
	const initializeNewChat = useInitializeNewChat();
	const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);

	useEffect(() => {
		const chats = useStore.getState().chats;
		const currentChatIndex = useStore.getState().currentChatIndex;
		if (!chats || chats.length === 0) {
			initializeNewChat();
		}
		if (chats && !(currentChatIndex >= 0 && currentChatIndex < chats.length)) {
			setCurrentChatIndex(0);
		}
	}, []);

	return (
		<div className="overflow-hidden w-full h-full relative">
			<Menu />
			<Chat />
			<Toast />
		</div>
	);
}

export default App;
