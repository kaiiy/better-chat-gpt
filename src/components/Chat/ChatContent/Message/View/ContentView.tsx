import React, {
	DetailedHTMLProps,
	HTMLAttributes,
	memo,
	useState,
} from "react";

import ReactMarkdown from "react-markdown";
import { CodeProps, ReactMarkdownProps } from "react-markdown/lib/ast-to-react";

import useStore from "@store/store";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import CrossIcon from "@icon/CrossIcon";
import TickIcon from "@icon/TickIcon";

import useSubmit from "@hooks/useSubmit";

import { ChatInterface } from "@type/chat";

import CopyButton from "./Button/CopyButton";
import DeleteButton from "./Button/DeleteButton";
import DownButton from "./Button/DownButton";
import EditButton from "./Button/EditButton";
import MarkdownModeButton from "./Button/MarkdownModeButton";
import RefreshButton from "./Button/RefreshButton";
import UpButton from "./Button/UpButton";

import CodeBlock from "../CodeBlock";

const ContentView = memo(
	({
		role,
		content,
		setIsEdit,
		messageIndex,
	}: {
		role: string;
		content: string;
		setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
		messageIndex: number;
	}) => {
		const { handleSubmit } = useSubmit();

		const [isDelete, setIsDelete] = useState<boolean>(false);

		const currentChatIndex = useStore((state) => state.currentChatIndex);
		const setChats = useStore((state) => state.setChats);
		const lastMessageIndex = useStore((state) =>
			state.chats ? state.chats[state.currentChatIndex].messages.length - 1 : 0,
		);
		const inlineLatex = useStore((state) => state.inlineLatex);
		const markdownMode = useStore((state) => state.markdownMode);

		const handleDelete = () => {
			const updatedChats: ChatInterface[] = JSON.parse(
				JSON.stringify(useStore.getState().chats),
			);
			updatedChats[currentChatIndex].messages.splice(messageIndex, 1);
			setChats(updatedChats);
		};

		const handleMove = (direction: "up" | "down") => {
			const updatedChats: ChatInterface[] = JSON.parse(
				JSON.stringify(useStore.getState().chats),
			);
			const updatedMessages = updatedChats[currentChatIndex].messages;
			const temp = updatedMessages[messageIndex];
			if (direction === "up") {
				updatedMessages[messageIndex] = updatedMessages[messageIndex - 1];
				updatedMessages[messageIndex - 1] = temp;
			} else {
				updatedMessages[messageIndex] = updatedMessages[messageIndex + 1];
				updatedMessages[messageIndex + 1] = temp;
			}
			setChats(updatedChats);
		};

		const handleMoveUp = () => {
			handleMove("up");
		};

		const handleMoveDown = () => {
			handleMove("down");
		};

		const handleRefresh = () => {
			const updatedChats: ChatInterface[] = JSON.parse(
				JSON.stringify(useStore.getState().chats),
			);
			const updatedMessages = updatedChats[currentChatIndex].messages;
			updatedMessages.splice(updatedMessages.length - 1, 1);
			setChats(updatedChats);
			handleSubmit();
		};

		const handleCopy = () => {
			navigator.clipboard.writeText(content);
		};

		return (
			<>
				<div className="markdown prose w-full md:max-w-full break-words dark:prose-invert dark share-gpt-message">
					{markdownMode ? (
						<ReactMarkdown
							remarkPlugins={[
								remarkGfm,
								[remarkMath, { singleDollarTextMath: inlineLatex }],
							]}
							rehypePlugins={[
								rehypeKatex,
								[
									rehypeHighlight,
									{
										detect: true,
										ignoreMissing: true,
									},
								],
							]}
							linkTarget="_new"
							components={{
								code,
								p,
							}}
						>
							{content}
						</ReactMarkdown>
					) : (
						<span className="whitespace-pre-wrap">{content}</span>
					)}
				</div>
				<div className="flex justify-end gap-2 w-full mt-2">
					{isDelete || (
						<>
							{!useStore.getState().generating &&
								role === "assistant" &&
								messageIndex === lastMessageIndex && (
									<RefreshButton onClick={handleRefresh} />
								)}
							{messageIndex !== 0 && <UpButton onClick={handleMoveUp} />}
							{messageIndex !== lastMessageIndex && (
								<DownButton onClick={handleMoveDown} />
							)}

							<MarkdownModeButton />
							<CopyButton onClick={handleCopy} />
							<EditButton setIsEdit={setIsEdit} />
							<DeleteButton setIsDelete={setIsDelete} />
						</>
					)}
					{isDelete && (
						<>
							<button
								type="button"
								className="p-1 hover:text-white"
								onClick={() => setIsDelete(false)}
							>
								<CrossIcon />
							</button>
							<button
								type="button"
								className="p-1 hover:text-white"
								onClick={handleDelete}
							>
								<TickIcon />
							</button>
						</>
					)}
				</div>
			</>
		);
	},
);

const code = memo((props: CodeProps) => {
	const { inline, className, children } = props;
	const match = /language-(\w+)/.exec(className || "");
	const lang = match?.[1];

	if (inline) {
		return <code className={className}>{children}</code>;
	}
	return <CodeBlock lang={lang || "text"} codeChildren={children} />;
});

const p = memo(
	(
		props?: Omit<
			DetailedHTMLProps<
				HTMLAttributes<HTMLParagraphElement>,
				HTMLParagraphElement
			>,
			"ref"
		> &
			ReactMarkdownProps,
	) => {
		return <p className="whitespace-pre-wrap">{props?.children}</p>;
	},
);

export default ContentView;
