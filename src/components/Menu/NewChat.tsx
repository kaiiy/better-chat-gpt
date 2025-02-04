import useStore from "@store/store";

import PlusIcon from "@icon/PlusIcon";

import useAddChat from "@hooks/useAddChat";

const NewChat = ({ folder }: { folder?: string }) => {
	const addChat = useAddChat();
	const generating = useStore((state) => state.generating);

	return (
		<button
			type="button"
			className={`flex flex-1 items-center rounded-md hover:bg-gray-500/10 transition-all duration-200 text-white text-sm flex-shrink-0 ${
				generating
					? "cursor-not-allowed opacity-40"
					: "cursor-pointer opacity-100"
			} ${
				folder ? "justify-start" : "py-2 px-2 gap-3 mb-2 border border-white/20"
			}`}
			onClick={() => {
				if (!generating) addChat(folder);
			}}
			title={folder ? "New Chat" : ""}
		>
			{folder ? (
				<div className="max-h-0 parent-sibling-hover:max-h-10 hover:max-h-10 parent-sibling-hover:py-2 hover:py-2 px-2 overflow-hidden transition-all duration-200 delay-500 text-sm flex gap-3 items-center text-gray-100">
					<PlusIcon /> New Chat
				</div>
			) : (
				<>
					<PlusIcon />
					<span className="inline-flex text-white text-sm">New Chat</span>
				</>
			)}
		</button>
	);
};

export default NewChat;
