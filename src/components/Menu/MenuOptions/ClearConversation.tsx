import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import useStore from "@store/store";

import PopupModal from "@components/PopupModal";
import DeleteIcon from "@icon/DeleteIcon";
import useInitializeNewChat from "@hooks/useInitializeNewChat";

const ClearConversation = () => {
	const { t } = useTranslation();

	const InitializeNewChat = useInitializeNewChat();
	const setFolders = useStore((state) => state.setFolders);
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	const handleConfirm = () => {
		setIsModalOpen(false);
		InitializeNewChat();
		setFolders({});
	};

	return (
		<>
			<button
				className="btn btn-neutral"
				onClick={() => {
					setIsModalOpen(true);
				}}
			>
				<DeleteIcon />
				{t("clearConversation")}
			</button>
			{isModalOpen && (
				<PopupModal
					setIsModalOpen={setIsModalOpen}
					title={t("warning") as string}
					message={t("clearConversationWarning") as string}
					handleConfirm={handleConfirm}
				/>
			)}
		</>
	);
};

export default ClearConversation;
