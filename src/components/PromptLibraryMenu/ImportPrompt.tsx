import useStore from "@store/store";
import { useRef, useState } from "react";
import { v4 as uuidV4 } from "uuid";

import { importPromptCSV } from "@utils/prompt";

const ImportPrompt = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [alert, setAlert] = useState<{
		message: string;
		success: boolean;
	} | null>(null);

	const handleFileUpload = () => {
		if (!inputRef || !inputRef.current) return;
		const file = inputRef.current.files?.[0];
		if (file) {
			const reader = new FileReader();

			reader.onload = (event) => {
				const csvString = event.target?.result as string;

				try {
					const results = importPromptCSV(csvString);

					const prompts = useStore.getState().prompts;
					const setPrompts = useStore.getState().setPrompts;

					const newPrompts = results.map((data) => {
						const columns = Object.values(data);
						return {
							id: uuidV4(),
							name: columns[0],
							prompt: columns[1],
						};
					});

					setPrompts(prompts.concat(newPrompts));

					setAlert({ message: "Successfully imported!", success: true });
				} catch (error: unknown) {
					setAlert({ message: (error as Error).message, success: false });
				}
			};

			reader.readAsText(file);
		}
	};

	return (
		<div>
			<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
				Import (CSV)
			</label>
			<input
				className="w-full text-sm file:p-2 text-gray-800 file:text-gray-700 dark:text-gray-300 dark:file:text-gray-200 rounded-md cursor-pointer focus:outline-none bg-gray-50 file:bg-gray-100 dark:bg-gray-800 dark:file:bg-gray-700 file:border-0 border border-gray-300 dark:border-gray-600 placeholder-gray-900 dark:placeholder-gray-300 file:cursor-pointer"
				type="file"
				ref={inputRef}
			/>
			<button
				type="button"
				className="btn btn-small btn-primary mt-3"
				onClick={handleFileUpload}
			>
				Import
			</button>
			{alert && (
				<div
					className={`relative py-2 px-3 w-full mt-3 border rounded-md text-gray-600 dark:text-gray-100 text-sm whitespace-pre-wrap ${
						alert.success
							? "border-green-500 bg-green-500/10"
							: "border-red-500 bg-red-500/10"
					}`}
				>
					{alert.message}
				</div>
			)}
		</div>
	);
};

export default ImportPrompt;
