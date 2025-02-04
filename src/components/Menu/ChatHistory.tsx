import React, { useEffect, useRef, useState } from "react";

import useInitializeNewChat from "@hooks/useInitializeNewChat";

import ChatIcon from "@icon/ChatIcon";
import CrossIcon from "@icon/CrossIcon";
import DeleteIcon from "@icon/DeleteIcon";
import EditIcon from "@icon/EditIcon";
import TickIcon from "@icon/TickIcon";
import useStore from "@store/store";

const ChatHistoryClass = {
	normal:
		"flex py-2 px-2 items-center gap-3 relative rounded-md bg-gray-900 hover:bg-gray-850 break-all hover:pr-4 group transition-opacity",
	active:
		"flex py-2 px-2 items-center gap-3 relative rounded-md break-all bg-gray-800 hover:bg-gray-800 group transition-opacity",
	normalGradient:
		"absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-900 group-hover:from-gray-850",
	activeGradient:
		"absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-800",
};

const ChatHistory = React.memo(
	({ title, chatIndex }: { title: string; chatIndex: number }) => {
		const InitializeNewChat = useInitializeNewChat();
		const setCurrentChatIndex = useStore((state) => state.setCurrentChatIndex);
		const setChats = useStore((state) => state.setChats);
		const active = useStore((state) => state.currentChatIndex === chatIndex);
		const generating = useStore((state) => state.generating);

		const [isDelete, setIsDelete] = useState<boolean>(false);
		const [isEdit, setIsEdit] = useState<boolean>(false);
		const [_title, _setTitle] = useState<string>(title);
		const inputRef = useRef<HTMLInputElement>(null);

		const editTitle = () => {
			const updatedChats = JSON.parse(
				JSON.stringify(useStore.getState().chats),
			);
			updatedChats[chatIndex].title = _title;
			setChats(updatedChats);
			setIsEdit(false);
		};

		const deleteChat = () => {
			const updatedChats = JSON.parse(
				JSON.stringify(useStore.getState().chats),
			);
			updatedChats.splice(chatIndex, 1);
			if (updatedChats.length > 0) {
				setCurrentChatIndex(0);
				setChats(updatedChats);
			} else {
				InitializeNewChat();
			}
			setIsDelete(false);
		};

		const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
			if (e.key === "Enter") {
				e.preventDefault();
				editTitle();
			}
		};

		const handleTick = (e: React.MouseEvent<HTMLDivElement>) => {
			e.stopPropagation();

			if (isEdit) editTitle();
			else if (isDelete) deleteChat();
		};

		const handleCross = () => {
			setIsDelete(false);
			setIsEdit(false);
		};

		useEffect(() => {
			if (inputRef?.current) inputRef.current.focus();
		}, [isEdit]);

		return (
			<button
				type="button"
				className={`${
					active ? ChatHistoryClass.active : ChatHistoryClass.normal
				} ${
					generating
						? "cursor-not-allowed opacity-40"
						: "cursor-pointer opacity-100"
				}`}
				onClick={() => {
					if (!generating) setCurrentChatIndex(chatIndex);
				}}
			>
				<ChatIcon />
				<div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
					{isEdit ? (
						<input
							type="text"
							className="focus:outline-blue-600 text-sm border-none bg-transparent p-0 m-0 w-full"
							value={_title}
							onChange={(e) => {
								_setTitle(e.target.value);
							}}
							onKeyDown={handleKeyDown}
							ref={inputRef}
						/>
					) : (
						_title
					)}

					{isEdit || (
						<div
							className={
								active
									? ChatHistoryClass.activeGradient
									: ChatHistoryClass.normalGradient
							}
						/>
					)}
				</div>
				{active && (
					<div className="absolute flex right-1 z-10 text-gray-300 visible">
						{isDelete || isEdit ? (
							<>
								<div
									role="button"
									className="p-1 hover:text-white"
									onClick={handleTick}
								>
									<TickIcon />
								</div>
								<div
									role="button"
									className="p-1 hover:text-white"
									onClick={handleCross}
								>
									<CrossIcon />
								</div>
							</>
						) : (
							<>
								<div
									role="button"
									className="p-1 hover:text-white"
									onClick={() => setIsEdit(true)}
								>
									<EditIcon />
								</div>
								<div
									role="button"
									className="p-1 hover:text-white"
									onClick={() => setIsDelete(true)}
								>
									<DeleteIcon />
								</div>
							</>
						)}
					</div>
				)}
			</button>
		);
	},
);

export default ChatHistory;
