import useStore from "@store/store";
import { useEffect } from "react";
import i18n from "./i18n";

import Chat from "@components/Chat";
import Menu from "@components/Menu";

import Toast from "@components/Toast";
import useInitializeNewChat from "@hooks/useInitializeNewChat";

function App() {
	const initializeNewChat = useInitializeNewChat();
	const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);

	useEffect(() => {
		document.documentElement.lang = i18n.language;
	}, []);

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
