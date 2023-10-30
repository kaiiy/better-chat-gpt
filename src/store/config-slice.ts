import { _defaultChatConfig, _defaultSystemMessage } from "@constants/chat";
import { ConfigInterface, TotalTokenUsed } from "@type/chat";
import { Theme } from "@type/theme";
import { StoreSlice } from "./store";

export interface ConfigSlice {
	openConfig: boolean;
	theme: Theme;
	autoTitle: boolean;
	hideMenuOptions: boolean;
	advancedMode: boolean;
	defaultChatConfig: ConfigInterface;
	defaultSystemMessage: string;
	hideSideMenu: boolean;
	inlineLatex: boolean;
	markdownMode: boolean;
	countTotalTokens: boolean;
	totalTokenUsed: TotalTokenUsed;
	setOpenConfig: (openConfig: boolean) => void;
	setTheme: (theme: Theme) => void;
	setAutoTitle: (autoTitle: boolean) => void;
	setAdvancedMode: (advancedMode: boolean) => void;
	setDefaultChatConfig: (defaultChatConfig: ConfigInterface) => void;
	setDefaultSystemMessage: (defaultSystemMessage: string) => void;
	setHideMenuOptions: (hideMenuOptions: boolean) => void;
	setHideSideMenu: (hideSideMenu: boolean) => void;
	setInlineLatex: (inlineLatex: boolean) => void;
	setMarkdownMode: (markdownMode: boolean) => void;
	setCountTotalTokens: (countTotalTokens: boolean) => void;
	setTotalTokenUsed: (totalTokenUsed: TotalTokenUsed) => void;
}

export const createConfigSlice: StoreSlice<ConfigSlice> = (set, _) => ({
	openConfig: false,
	theme: "dark",
	hideMenuOptions: false,
	hideSideMenu: false,
	autoTitle: true,
	advancedMode: true,
	defaultChatConfig: _defaultChatConfig,
	defaultSystemMessage: _defaultSystemMessage,
	inlineLatex: false,
	markdownMode: true,
	countTotalTokens: true,
	totalTokenUsed: {},
	setOpenConfig: (openConfig: boolean) => {
		set((prev: ConfigSlice) => ({
			...prev,
			openConfig: openConfig,
		}));
	},
	setTheme: (theme: Theme) => {
		set((prev: ConfigSlice) => ({
			...prev,
			theme: theme,
		}));
	},
	setAutoTitle: (autoTitle: boolean) => {
		set((prev: ConfigSlice) => ({
			...prev,
			autoTitle: autoTitle,
		}));
	},
	setAdvancedMode: (advancedMode: boolean) => {
		set((prev: ConfigSlice) => ({
			...prev,
			advancedMode: advancedMode,
		}));
	},
	setDefaultChatConfig: (defaultChatConfig: ConfigInterface) => {
		set((prev: ConfigSlice) => ({
			...prev,
			defaultChatConfig: defaultChatConfig,
		}));
	},
	setDefaultSystemMessage: (defaultSystemMessage: string) => {
		set((prev: ConfigSlice) => ({
			...prev,
			defaultSystemMessage: defaultSystemMessage,
		}));
	},
	setHideMenuOptions: (hideMenuOptions: boolean) => {
		set((prev: ConfigSlice) => ({
			...prev,
			hideMenuOptions: hideMenuOptions,
		}));
	},
	setHideSideMenu: (hideSideMenu: boolean) => {
		set((prev: ConfigSlice) => ({
			...prev,
			hideSideMenu: hideSideMenu,
		}));
	},
	setInlineLatex: (inlineLatex: boolean) => {
		set((prev: ConfigSlice) => ({
			...prev,
			inlineLatex: inlineLatex,
		}));
	},
	setMarkdownMode: (markdownMode: boolean) => {
		set((prev: ConfigSlice) => ({
			...prev,
			markdownMode: markdownMode,
		}));
	},
	setCountTotalTokens: (countTotalTokens: boolean) => {
		set((prev: ConfigSlice) => ({
			...prev,
			countTotalTokens: countTotalTokens,
		}));
	},
	setTotalTokenUsed: (totalTokenUsed: TotalTokenUsed) => {
		set((prev: ConfigSlice) => ({
			...prev,
			totalTokenUsed: totalTokenUsed,
		}));
	},
});
