import useStore from "@store/store";
import { useEffect, useState } from "react";

import PopupModal from "@components/PopupModal";
import SettingIcon from "@icon/SettingIcon";
import AdvancedModeToggle from "./AdvancedModeToggle";
import AutoTitleToggle from "./AutoTitleToggle";
import InlineLatexToggle from "./InlineLatexToggle";

import ChatConfigMenu from "@components/ChatConfigMenu";
import ClearConversation from "@components/Menu/MenuOptions/ClearConversation";
import PromptLibraryMenu from "@components/PromptLibraryMenu";
import TotalTokenCost, { TotalTokenCostToggle } from "./TotalTokenCost";

const SettingsMenu = () => {
	const theme = useStore.getState().theme;
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	useEffect(() => {
		document.documentElement.className = theme;
	}, [theme]);
	return (
		<>
			<a
				className="flex py-2 px-2 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
				onClick={() => {
					setIsModalOpen(true);
				}}
			>
				<SettingIcon className="w-4 h-4" /> Settings
			</a>
			{isModalOpen && (
				<PopupModal
					setIsModalOpen={setIsModalOpen}
					title="Settings"
					cancelButton={false}
				>
					<div className="py-6 px-16 border-b border-gray-200 dark:border-gray-600 flex flex-col items-center gap-4">
						<div className="flex flex-col gap-3">
							<AutoTitleToggle />
							<InlineLatexToggle />
							<AdvancedModeToggle />
							<TotalTokenCostToggle />
						</div>
						<ClearConversation />
						<PromptLibraryMenu />
						<ChatConfigMenu />
						<TotalTokenCost />
					</div>
				</PopupModal>
			)}
		</>
	);
};

export default SettingsMenu;
