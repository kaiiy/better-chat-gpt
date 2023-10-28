import useStore from "@store/store";

import ImportExportChat from "@components/ImportExportChat";
import SettingsMenu from "@components/SettingsMenu";
import { TotalTokenCostDisplay } from "@components/SettingsMenu/TotalTokenCost";
import Api from "./Api";
import CollapseOptions from "./CollapseOptions";

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
