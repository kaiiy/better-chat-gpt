import { getChatCompletion } from "@api/api";
import { _defaultChatConfig } from "@constants/chat";
import useStore from "@store/store";
import { MessageInterface } from "@type/chat";

const generateTitleChatConfig = () => {
	const config = _defaultChatConfig;
	config.model = "gpt-3.5-turbo";
	return config;
};
const titleChatConfig = generateTitleChatConfig();

interface FetchTitleProps {
	message: MessageInterface[];
	apiKey: string | undefined;
}

const fetchTitle = async ({
	message,
	apiKey,
}: FetchTitleProps): Promise<string> => {
	let data;
	try {
		if (!apiKey || apiKey.length === 0) {
			throw new Error("No API key supplied! Please check your API settings.");
		} else if (apiKey.length > 0) {
			data = await getChatCompletion(
				useStore.getState().apiEndpoint,
				message,
				titleChatConfig,
				apiKey,
			);
		}
	} catch (error: unknown) {
		throw new Error(`Error generating title!\n${(error as Error).message}`);
	}
	return data.choices[0].message.content;
};

export const generateTitle = async ({
	message,
	apiKey,
}: FetchTitleProps): Promise<string> => {
	let title = await fetchTitle({ message, apiKey });
	title = title.trim();
	if (title.startsWith('"') && title.endsWith('"')) {
		title = title.slice(1, -1);
	}
	return title;
};
