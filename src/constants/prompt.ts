import { Prompt } from "@type/prompt";

// prompts from https://github.com/f/awesome-chatgpt-prompts
const defaultPrompts: Prompt[] = [
	{
		id: "0d3e9cb7-b585-43fa-acc3-840c189f6b93",
		name: "English Translator",
		prompt:
			"I want you to act as an English translator, spelling corrector and improver. I will speak to you in any language and you will detect the language, translate it and answer in the corrected and improved version of my text, in English. I want you to replace my simplified A0-level words and sentences with more beautiful and elegant, upper level English words and sentences. Keep the meaning same, but make them more literary. I want you to only reply the correction, the improvements and nothing else, do not write explanations. Do you understand?",
	},
	{
		id: "9c00393e-e977-4f2b-b6d5-cfdb329f77b6",
		name: "Rephrase and Respond",
		prompt:
			"上記の質問を、より良く答えるために言い換えて拡張してください。元の質問の情報を全て維持してください。",
	},
];

export default defaultPrompts;
