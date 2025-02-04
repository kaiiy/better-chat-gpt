export type Role = "user" | "assistant" | "system";
export const roles: Role[] = ["user", "assistant", "system"];

export interface MessageInterface {
	role: Role;
	content: string;
}

export interface ChatInterface {
	id: string;
	title: string;
	folder?: string;
	messages: MessageInterface[];
	config: ConfigInterface;
	titleSet: boolean;
}

export interface ConfigInterface {
	model: ModelOptions;
	max_tokens: number;
	temperature: number;
	presence_penalty: number;
	top_p: number;
	frequency_penalty: number;
}

export interface ChatHistoryInterface {
	title: string;
	index: number;
	id: string;
}

export interface ChatHistoryFolderInterface {
	[folderId: string]: ChatHistoryInterface[];
}

export interface FolderCollection {
	[folderId: string]: Folder;
}

export interface Folder {
	id: string;
	name: string;
	expanded: boolean;
	order: number;
	color?: string;
}

export type ModelOptions =
	//   | "gpt-4"
	//   | "gpt-4-32k"
	//   | "gpt-3.5-turbo"
	"gpt-3.5-turbo-16k" | "gpt-4-0125-preview";

export type TotalTokenUsed = {
	[model in ModelOptions]?: {
		promptTokens: number;
		completionTokens: number;
	};
};
