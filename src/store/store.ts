import { StoreApi, create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthSlice, createAuthSlice } from "./auth-slice";
import { ChatSlice, createChatSlice } from "./chat-slice";
import { ConfigSlice, createConfigSlice } from "./config-slice";
import { InputSlice, createInputSlice } from "./input-slice";
import { PromptSlice, createPromptSlice } from "./prompt-slice";
import { ToastSlice, createToastSlice } from "./toast-slice";

type StoreState = ChatSlice &
	InputSlice &
	AuthSlice &
	ConfigSlice &
	PromptSlice &
	ToastSlice;

export type StoreSlice<T> = (
	set: StoreApi<StoreState>["setState"],
	get: StoreApi<StoreState>["getState"],
) => T;

const createPartializedState = (state: StoreState) => ({
	chats: state.chats,
	currentChatIndex: state.currentChatIndex,
	apiKey: state.apiKey,
	apiEndpoint: state.apiEndpoint,
	theme: state.theme,
	autoTitle: state.autoTitle,
	advancedMode: state.advancedMode,
	prompts: state.prompts,
	defaultChatConfig: state.defaultChatConfig,
	defaultSystemMessage: state.defaultSystemMessage,
	hideMenuOptions: state.hideMenuOptions,
	firstVisit: state.firstVisit,
	hideSideMenu: state.hideSideMenu,
	folders: state.folders,
	inlineLatex: state.inlineLatex,
	markdownMode: state.markdownMode,
	totalTokenUsed: state.totalTokenUsed,
	countTotalTokens: state.countTotalTokens,
});

const useStore = create<StoreState>()(
	persist(
		(set, get) => ({
			...createChatSlice(set, get),
			...createInputSlice(set, get),
			...createAuthSlice(set, get),
			...createConfigSlice(set, get),
			...createPromptSlice(set, get),
			...createToastSlice(set, get),
		}),
		{
			name: "free-chat-gpt",
			partialize: (state) => createPartializedState(state),
			version: 8,
		},
	),
);

export default useStore;
