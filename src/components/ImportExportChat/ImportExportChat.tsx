import { useState } from "react";

import PopupModal from "@components/PopupModal";
import ExportIcon from "@icon/ExportIcon";

import ExportChat from "./ExportChat";
import ImportChat from "./ImportChat";
import ImportChatOpenAI from "./ImportChatOpenAI";

const ImportExportChat = () => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	return (
		<>
			<button
				type="button"
				className="flex w-full py-2 px-2 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
				onClick={() => {
					setIsModalOpen(true);
				}}
			>
				<ExportIcon className="w-4 h-4" />
				Import / Export
			</button>
			{isModalOpen && (
				<PopupModal
					title={"Import / Export"}
					setIsModalOpen={setIsModalOpen}
					cancelButton={false}
				>
					<div className="p-6 border-b border-gray-200 dark:border-gray-600">
						<ImportChat />
						<ExportChat />
						<div className="border-t my-3 border-gray-200 dark:border-gray-600" />
						<ImportChatOpenAI setIsModalOpen={setIsModalOpen} />
					</div>
				</PopupModal>
			)}
		</>
	);
};

export default ImportExportChat;
