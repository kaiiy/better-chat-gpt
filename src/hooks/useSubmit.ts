import { getChatCompletionStream } from "@api/api";
import { parseEventSource } from "@api/helper";
import { _defaultChatConfig } from "@constants/chat";
import useStore from "@store/store";
import { ChatInterface, MessageInterface } from "@type/chat";
import { generateTitle } from "@utils/chatTitle";
import { limitMessageTokens, updateTotalTokenUsed } from "@utils/messageUtils";

const useSubmit = () => {
	const error = useStore((state) => state.error);
	const setError = useStore((state) => state.setError);
	const apiKey = useStore((state) => state.apiKey);
	const setGenerating = useStore((state) => state.setGenerating);
	const generating = useStore((state) => state.generating);
	const currentChatIndex = useStore((state) => state.currentChatIndex);
	const setChats = useStore((state) => state.setChats);

	const handleSubmit = async () => {
		const chats = useStore.getState().chats;
		if (generating || !chats) return;

		const updatedChats: ChatInterface[] = JSON.parse(JSON.stringify(chats));

		updatedChats[currentChatIndex].messages.push({
			role: "assistant",
			content: "",
		});

		setChats(updatedChats);
		setGenerating(true);

		try {
			let stream = null;
			if (chats[currentChatIndex].messages.length === 0) {
				throw new Error("No messages submitted!");
			}

			const messages = limitMessageTokens(
				chats[currentChatIndex].messages,
				chats[currentChatIndex].config.max_tokens,
				chats[currentChatIndex].config.model,
			);
			if (messages.length === 0) throw new Error("Message exceed max token!");

			// no api key (free)
			if (!apiKey || apiKey.length === 0) {
				throw new Error("No API key supplied! Please check your API settings.");
			}
			if (apiKey.length > 0) {
				stream = await getChatCompletionStream(
					useStore.getState().apiEndpoint,
					messages,
					chats[currentChatIndex].config,
					apiKey,
				);
			}

			if (stream !== null) {
				if (stream.locked) {
					throw new Error(
						"Oops, the stream is locked right now. Please try again",
					);
				}
				const reader = stream.getReader();
				let reading = true;
				let partial = "";
				while (reading && useStore.getState().generating) {
					const { done, value } = await reader.read();
					const result = parseEventSource(
						partial + new TextDecoder().decode(value),
					);
					partial = "";

					if (result === "[DONE]" || done) {
						reading = false;
					} else {
						const resultString = result.reduce((prevOutput: string, curr) => {
							let output = prevOutput;
							if (typeof curr === "string") {
								partial += curr;
							} else {
								const content = curr.choices[0].delta.content;
								if (content) output += content;
							}
							return output;
						}, "");

						const updatedChats: ChatInterface[] = JSON.parse(
							JSON.stringify(useStore.getState().chats),
						);
						const updatedMessages = updatedChats[currentChatIndex].messages;
						updatedMessages[updatedMessages.length - 1].content += resultString;
						setChats(updatedChats);
					}
				}
				if (useStore.getState().generating) {
					reader.cancel("Cancelled by user");
				} else {
					reader.cancel("Generation completed");
				}
				reader.releaseLock();
				stream.cancel();
			}

			// update tokens used in chatting
			const currChats = useStore.getState().chats;
			const countTotalTokens = useStore.getState().countTotalTokens;

			if (currChats && countTotalTokens) {
				const model = currChats[currentChatIndex].config.model;
				const messages = currChats[currentChatIndex].messages;
				updateTotalTokenUsed(
					model,
					messages.slice(0, -1),
					messages[messages.length - 1],
				);
			}

			// generate title for new chats
			if (
				useStore.getState().autoTitle &&
				currChats !== undefined &&
				!currChats[currentChatIndex]?.titleSet
			) {
				const messages_length = currChats[currentChatIndex].messages.length;
				const assistant_message =
					currChats[currentChatIndex].messages[messages_length - 1].content;
				const user_message =
					currChats[currentChatIndex].messages[messages_length - 2].content;

				const message: MessageInterface = {
					role: "user",
					content: `Generate a title in less than 5 words for the following message (language: English):\n"""\nUser: ${user_message}\nAssistant: ${assistant_message}\n"""`,
				};

				const title = await generateTitle({
					message: [message],
					apiKey,
				});
				const updatedChats: ChatInterface[] = JSON.parse(
					JSON.stringify(useStore.getState().chats),
				);
				updatedChats[currentChatIndex].title = title;
				updatedChats[currentChatIndex].titleSet = true;
				setChats(updatedChats);

				// update tokens used for generating title
				if (countTotalTokens) {
					const model = _defaultChatConfig.model;
					updateTotalTokenUsed(model, [message], {
						role: "assistant",
						content: title,
					});
				}
			}
		} catch (e: unknown) {
			const err = (e as Error).message;
			console.error(err);
			setError(err);
		}
		setGenerating(false);
	};

	return { handleSubmit, error };
};

export default useSubmit;
