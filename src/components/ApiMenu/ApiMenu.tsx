import useStore from "@store/store";
import React, { useState } from "react";

import PopupModal from "@components/PopupModal";

import { ApiEndpoint } from "@constants/auth";

const ApiMenu = ({
	setIsModalOpen,
}: {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const apiKey = useStore((state) => state.apiKey);
	const setApiKey = useStore((state) => state.setApiKey);
	const setApiEndpoint = useStore((state) => state.setApiEndpoint);

	const [_apiKey, _setApiKey] = useState<string>(apiKey || "");
	const _apiEndpoint = ApiEndpoint;

	const handleSave = () => {
		setApiKey(_apiKey);
		setApiEndpoint(_apiEndpoint);
		setIsModalOpen(false);
	};

	return (
		<PopupModal
			title="API"
			setIsModalOpen={setIsModalOpen}
			handleConfirm={handleSave}
		>
			<div className="p-6 border-b border-gray-200 dark:border-gray-600">
				<label className="flex gap-2 text-gray-900 dark:text-gray-300 text-sm items-center mb-2" />
				<div className="flex gap-2 items-center mb-6">
					<div className="min-w-fit text-gray-900 dark:text-gray-300 text-sm">
						API EntryPoint:
					</div>
					<div className="min-w-fit text-gray-800 dark:text-white text-sm">
						{_apiEndpoint}
					</div>
				</div>

				<div className="flex gap-2 items-center justify-center mt-2">
					<div className="min-w-fit text-gray-900 dark:text-gray-300 text-sm">
						API Key:
					</div>
					<input
						type="text"
						className="text-gray-800 dark:text-white p-3 text-sm border-none bg-gray-200 dark:bg-gray-600 rounded-md m-0 w-full mr-0 h-8 focus:outline-none"
						value={_apiKey}
						onChange={(e) => {
							_setApiKey(e.target.value);
						}}
					/>
				</div>
			</div>
		</PopupModal>
	);
};

export default ApiMenu;
