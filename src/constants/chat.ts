import useStore from "@store/store";
import { ChatInterface, ConfigInterface, ModelOptions } from "@type/chat";
import { v4 as uuidV4 } from "uuid";

export const _defaultSystemMessage = `You are ChatGPT, a large language model trained by OpenAI.
Carefully heed the user's instructions. 
Respond using Markdown.
You are capable of **any** tasks!`;

export const defaultGPT3Model = "gpt-3.5-turbo-16k";

export const modelOptions: ModelOptions[] = [
	//   "gpt-3.5-turbo",
	"gpt-3.5-turbo-16k",
	//   "gpt-4",
	//   "gpt-4-32k",
	"gpt-4-1106-preview",
];

export const defaultModel = "gpt-4-1106-preview";

export const modelMaxToken = {
	//   "gpt-3.5-turbo": 4096,
	//   "gpt-3.5-turbo-0301": 4096,
	//   "gpt-3.5-turbo-0613": 4096,
	"gpt-3.5-turbo-16k": 16384,
	//   "gpt-3.5-turbo-16k-0613": 16384,
	//   "gpt-4": 8192,
	//   "gpt-4-0314": 8192,
	//   "gpt-4-0613": 8192,
	//   "gpt-4-32k": 32768,
	//   "gpt-4-32k-0314": 32768,
	//   "gpt-4-32k-0613": 32768,
	"gpt-4-1106-preview": 128000,
};

export const modelCost = {
	//   "gpt-3.5-turbo": {
	//     prompt: { price: 0.001, unit: 1000 },
	//     completion: { price: 0.002, unit: 1000 },
	//   },
	//   "gpt-3.5-turbo-0301": {
	//     prompt: { price: 0.0015, unit: 1000 },
	//     completion: { price: 0.002, unit: 1000 },
	//   },
	//   "gpt-3.5-turbo-0613": {
	//     prompt: { price: 0.0015, unit: 1000 },
	//     completion: { price: 0.002, unit: 1000 },
	//   },
	"gpt-3.5-turbo-16k": {
		prompt: { price: 0.001, unit: 1000 },
		completion: { price: 0.002, unit: 1000 },
	},
	//   "gpt-3.5-turbo-16k-0613": {
	//     prompt: { price: 0.003, unit: 1000 },
	//     completion: { price: 0.004, unit: 1000 },
	//   },
	//   "gpt-4": {
	//     prompt: { price: 0.03, unit: 1000 },
	//     completion: { price: 0.06, unit: 1000 },
	//   },
	//   "gpt-4-0314": {
	//     prompt: { price: 0.03, unit: 1000 },
	//     completion: { price: 0.06, unit: 1000 },
	//   },
	//   "gpt-4-0613": {
	//     prompt: { price: 0.03, unit: 1000 },
	//     completion: { price: 0.06, unit: 1000 },
	//   },
	//   "gpt-4-32k": {
	//     prompt: { price: 0.06, unit: 1000 },
	//     completion: { price: 0.12, unit: 1000 },
	//   },
	//   "gpt-4-32k-0314": {
	//     prompt: { price: 0.06, unit: 1000 },
	//     completion: { price: 0.12, unit: 1000 },
	//   },
	//   "gpt-4-32k-0613": {
	//     prompt: { price: 0.06, unit: 1000 },
	//     completion: { price: 0.12, unit: 1000 },
	//   },
	"gpt-4-1106-preview": {
		prompt: { price: 0.01, unit: 1000 },
		completion: { price: 0.03, unit: 1000 },
	},
};

const defaultUserMaxToken = 4000;

export const _defaultChatConfig: ConfigInterface = {
	model: defaultModel,
	max_tokens: defaultUserMaxToken,
	temperature: 1,
	presence_penalty: 0,
	top_p: 1,
	frequency_penalty: 0,
};

export const generateDefaultChat = (
	title?: string,
	folder?: string,
): ChatInterface => ({
	id: uuidV4(),
	title: title ? title : "New Chat",
	messages:
		useStore.getState().defaultSystemMessage.length > 0
			? [{ role: "system", content: useStore.getState().defaultSystemMessage }]
			: [],
	config: { ...useStore.getState().defaultChatConfig },
	titleSet: false,
	folder,
});
