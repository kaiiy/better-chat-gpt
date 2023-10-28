import useStore from "@store/store";
import React from "react";

import ImportExportChat from "@components/ImportExportChat";
import SettingsMenu from "@components/SettingsMenu";
import { TotalTokenCostDisplay } from "@components/SettingsMenu/TotalTokenCost";
import Api from "./Api";
import CollapseOptions from "./CollapseOptions";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || undefined;

const MenuOptions = () => {
	const hideMenuOptions = useStore((state) => state.hideMenuOptions);
	const countTotalTokens = useStore((state) => state.countTotalTokens);
	return (
		<>
			<CollapseOptions />
			<div
				className={`${
					hideMenuOptions ? "max-h-0" : "max-h-full"
				} overflow-hidden transition-all`}
			>
				{countTotalTokens && <TotalTokenCostDisplay />}
				<ImportExportChat />
				<Api />
				<SettingsMenu />
			</div>
		</>
	);
};

export default MenuOptions;
