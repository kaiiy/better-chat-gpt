import useStore from "@store/store";
import { exportPrompts } from "@utils/prompt";

const ExportPrompt = () => {
	const prompts = useStore.getState().prompts;

	return (
		<div className="mt-4">
			<div className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
				Export (CSV)
			</div>
			<button
				type="button"
				className="btn btn-small btn-primary"
				onClick={() => {
					exportPrompts(prompts);
				}}
			>
				Export
			</button>
		</div>
	);
};

export default ExportPrompt;
