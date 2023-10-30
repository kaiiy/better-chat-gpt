import useStore from "@store/store";
import { useState } from "react";

import PopupModal from "@components/PopupModal";
import useInitializeNewChat from "@hooks/useInitializeNewChat";
import DeleteIcon from "@icon/DeleteIcon";

const ClearConversation = () => {
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
				type="button"
				className="btn gap-3 btn-neutral"
				onClick={() => {
					setIsModalOpen(true);
				}}
			>
				<DeleteIcon />
				Clear Conversation History
			</button>
			{isModalOpen && (
				<PopupModal
					setIsModalOpen={setIsModalOpen}
					title={"Warning"}
					message={
						"Please be advised that by confirming this action, all messages will be deleted!"
					}
					handleConfirm={handleConfirm}
				/>
			)}
		</>
	);
};

export default ClearConversation;
