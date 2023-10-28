import PopupModal from "@components/PopupModal";
import ImageIcon from "@icon/ImageIcon";
import JsonIcon from "@icon/JsonIcon";
import MarkdownIcon from "@icon/MarkdownIcon";
import useStore from "@store/store";
import {
	chatToMarkdown,
	downloadImg,
	downloadMarkdown,
	htmlToImg,
} from "@utils/chat";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import downloadFile from "@utils/downloadFile";

const DownloadChat = React.memo(
	({ saveRef }: { saveRef: React.RefObject<HTMLDivElement> }) => {
		const { t } = useTranslation();
		const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
		return (
			<>
				<button
					type="button"
					className="btn btn-neutral"
					onClick={() => {
						setIsModalOpen(true);
					}}
				>
					{t("downloadChat")}
				</button>
				{isModalOpen && (
					<PopupModal
						setIsModalOpen={setIsModalOpen}
						title={t("downloadChat") as string}
						cancelButton={false}
					>
						<div className="p-6 border-b border-gray-200 dark:border-gray-600 flex gap-4">
							<button
								type="button"
								className="btn btn-neutral gap-2"
								onClick={async () => {
									if (saveRef?.current) {
										const imgData = await htmlToImg(saveRef.current);
										downloadImg(
											imgData,
											`${
												useStore
													.getState()
													.chats?.[
														useStore.getState().currentChatIndex
													].title.trim() ?? "download"
											}.png`,
										);
									}
								}}
							>
								<ImageIcon />
								Image
							</button>
							<button
								type="button"
								className="btn btn-neutral gap-2"
								onClick={async () => {
									if (saveRef?.current) {
										const chats = useStore.getState().chats;
										if (chats) {
											const markdown = chatToMarkdown(
												chats[useStore.getState().currentChatIndex],
											);
											downloadMarkdown(
												markdown,
												`${
													chats[
														useStore.getState().currentChatIndex
													].title.trim() ?? "download"
												}.md`,
											);
										}
									}
								}}
							>
								<MarkdownIcon />
								Markdown
							</button>
							<button
								type="button"
								className="btn btn-neutral gap-2"
								onClick={async () => {
									const chats = useStore.getState().chats;
									if (chats) {
										const chat = chats[useStore.getState().currentChatIndex];
										const filename = chat.title.replaceAll(" ", "_");
										downloadFile([chat], filename);
									}
								}}
							>
								<JsonIcon />
								JSON
							</button>
						</div>
					</PopupModal>
				)}
			</>
		);
	},
);

export default DownloadChat;
