import { useState } from "react";
import { useTranslation } from "react-i18next";

import ApiMenu from "@components/ApiMenu";
import PersonIcon from "@icon/PersonIcon";

const Config = () => {
	const { t } = useTranslation();
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	return (
		<>
			<button
				type="button"
				className="flex w-full py-2 px-2 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
				id="api-menu"
				onClick={() => setIsModalOpen(true)}
			>
				<PersonIcon />
				{t("api")}
			</button>
			{isModalOpen && <ApiMenu setIsModalOpen={setIsModalOpen} />}
		</>
	);
};

export default Config;
