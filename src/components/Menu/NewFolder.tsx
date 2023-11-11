import useStore from "@store/store";
import { v4 as uuidV4 } from "uuid";

import NewFolderIcon from "@icon/NewFolderIcon";
import { Folder, FolderCollection } from "@type/chat";

const NewFolder = () => {
	const generating = useStore((state) => state.generating);
	const setFolders = useStore((state) => state.setFolders);

	const addFolder = () => {
		let folderIndex = 1;
		let name = `New Folder ${folderIndex}`;

		const folders = useStore.getState().folders;

		while (Object.values(folders).some((folder) => folder.name === name)) {
			folderIndex += 1;
			name = `New Folder ${folderIndex}`;
		}

		const updatedFolders: FolderCollection = JSON.parse(
			JSON.stringify(folders),
		);

		const id = uuidV4();
		const newFolder: Folder = {
			id,
			name,
			expanded: false,
			order: 0,
		};

		for (const folder of Object.values(updatedFolders)) {
			folder.order += 1;
		}

		setFolders({ [id]: newFolder, ...updatedFolders });
	};

	return (
		<button
			type="button"
			className={`flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white text-sm mb-2 flex-shrink-0 border border-white/20 transition-opacity ${
				generating
					? "cursor-not-allowed opacity-40"
					: "cursor-pointer opacity-100"
			}`}
			onClick={() => {
				if (!generating) addFolder();
			}}
		>
			<NewFolderIcon />
		</button>
	);
};

export default NewFolder;
