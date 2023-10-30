import PopupModal from "@components/PopupModal";
import { modelMaxToken, modelOptions } from "@constants/chat";
import DownChevronArrow from "@icon/DownChevronArrow";
import { ConfigInterface, ModelOptions } from "@type/chat";
import React, { useEffect, useRef, useState } from "react";

interface ConfigMenuProps {
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	config: ConfigInterface;
	setConfig: (config: ConfigInterface) => void;
}
const ConfigMenu = ({ setIsModalOpen, config, setConfig }: ConfigMenuProps) => {
	const [_maxToken, _setMaxToken] = useState<number>(config.max_tokens);
	const [_model, _setModel] = useState<ModelOptions>(config.model);
	const [_temperature, _setTemperature] = useState<number>(config.temperature);
	const [_presencePenalty, _setPresencePenalty] = useState<number>(
		config.presence_penalty,
	);
	const [_topP, _setTopP] = useState<number>(config.top_p);
	const [_frequencyPenalty, _setFrequencyPenalty] = useState<number>(
		config.frequency_penalty,
	);

	const handleConfirm = () => {
		setConfig({
			max_tokens: _maxToken,
			model: _model,
			temperature: _temperature,
			presence_penalty: _presencePenalty,
			top_p: _topP,
			frequency_penalty: _frequencyPenalty,
		});
		setIsModalOpen(false);
	};

	return (
		<PopupModal
			title={"Configuration"}
			setIsModalOpen={setIsModalOpen}
			handleConfirm={handleConfirm}
			handleClickBackdrop={handleConfirm}
		>
			<div className="p-6 border-b border-gray-200 dark:border-gray-600">
				<ModelSelector _model={_model} _setModel={_setModel} />
				<MaxTokenSlider
					_maxToken={_maxToken}
					_setMaxToken={_setMaxToken}
					_model={_model}
				/>
				<TemperatureSlider
					_temperature={_temperature}
					_setTemperature={_setTemperature}
				/>
				<TopPSlider _topP={_topP} _setTopP={_setTopP} />
				<PresencePenaltySlider
					_presencePenalty={_presencePenalty}
					_setPresencePenalty={_setPresencePenalty}
				/>
				<FrequencyPenaltySlider
					_frequencyPenalty={_frequencyPenalty}
					_setFrequencyPenalty={_setFrequencyPenalty}
				/>
			</div>
		</PopupModal>
	);
};

interface ModelSelectorProps {
	_model: ModelOptions;
	_setModel: React.Dispatch<React.SetStateAction<ModelOptions>>;
}
export const ModelSelector = ({ _model, _setModel }: ModelSelectorProps) => {
	const [dropDown, setDropDown] = useState<boolean>(false);

	return (
		<div className="mb-4">
			<button
				className="btn btn-neutral btn-small flex gap-1"
				type="button"
				onClick={() => setDropDown((prev) => !prev)}
			>
				{_model}
				<DownChevronArrow />
			</button>
			<div
				id="dropdown"
				className={`${
					dropDown ? "" : "hidden"
				} absolute top-100 bottom-100 z-10 bg-white rounded-lg shadow-xl border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group dark:bg-gray-800 opacity-90`}
			>
				<ul
					className="text-sm text-gray-700 dark:text-gray-200 p-0 m-0"
					aria-labelledby="dropdownDefaultButton"
				>
					{modelOptions.map((m) => (
						<li
							className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
							onClick={() => {
								_setModel(m);
								setDropDown(false);
							}}
							key={m}
						>
							{m}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

interface MaxTokenSliderProps {
	_maxToken: number;
	_setMaxToken: React.Dispatch<React.SetStateAction<number>>;
	_model: ModelOptions;
}
export const MaxTokenSlider = ({
	_maxToken,
	_setMaxToken,
	_model,
}: MaxTokenSliderProps) => {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		inputRef?.current && _setMaxToken(Number(inputRef.current.value));
	}, [_model]);

	return (
		<div>
			<label className="block text-sm font-medium text-gray-900 dark:text-white">
				Max Token: {_maxToken}
			</label>
			<input
				type="range"
				ref={inputRef}
				value={_maxToken}
				onChange={(e) => {
					_setMaxToken(Number(e.target.value));
				}}
				min={0}
				max={modelMaxToken[_model]}
				step={1}
				className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
			/>
			<div className="min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-2">
				The maximum number of tokens to generate in the chat completion. The
				total length of input tokens and generated tokens is limited by the
				model's context length.
			</div>
		</div>
	);
};

export const TemperatureSlider = ({
	_temperature,
	_setTemperature,
}: {
	_temperature: number;
	_setTemperature: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<div className="mt-5 pt-5 border-t border-gray-500">
			<label className="block text-sm font-medium text-gray-900 dark:text-white">
				Temperature: {_temperature}
			</label>
			<input
				id="default-range"
				type="range"
				value={_temperature}
				onChange={(e) => {
					_setTemperature(Number(e.target.value));
				}}
				min={0}
				max={2}
				step={0.1}
				className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
			/>
			<div className="min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-2">
				What sampling temperature to use, between 0 and 2. Higher values like
				0.8 will make the output more random, while lower values like 0.2 will
				make it more focused and deterministic. We generally recommend altering
				this or top p but not both. (Default: 1)
			</div>
		</div>
	);
};

export const TopPSlider = ({
	_topP,
	_setTopP,
}: {
	_topP: number;
	_setTopP: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<div className="mt-5 pt-5 border-t border-gray-500">
			<label className="block text-sm font-medium text-gray-900 dark:text-white">
				Top-p: {_topP}
			</label>
			<input
				id="default-range"
				type="range"
				value={_topP}
				onChange={(e) => {
					_setTopP(Number(e.target.value));
				}}
				min={0}
				max={1}
				step={0.05}
				className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
			/>
			<div className="min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-2">
				Number between 0 and 1. An alternative to sampling with temperature,
				called nucleus sampling, where the model considers the results of the
				tokens with top p probability mass. So 0.1 means only the tokens
				comprising the top 10% probability mass are considered. We generally
				recommend altering this or temperature but not both. (Default: 1)
			</div>
		</div>
	);
};

export const PresencePenaltySlider = ({
	_presencePenalty,
	_setPresencePenalty,
}: {
	_presencePenalty: number;
	_setPresencePenalty: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<div className="mt-5 pt-5 border-t border-gray-500">
			<label className="block text-sm font-medium text-gray-900 dark:text-white">
				Presence Penalty: {_presencePenalty}
			</label>
			<input
				id="default-range"
				type="range"
				value={_presencePenalty}
				onChange={(e) => {
					_setPresencePenalty(Number(e.target.value));
				}}
				min={-2}
				max={2}
				step={0.1}
				className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
			/>
			<div className="min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-2">
				Number between -2.0 and 2.0. Positive values penalize new tokens based
				on whether they appear in the text so far, increasing the model's
				likelihood to talk about new topics. (Default: 0)
			</div>
		</div>
	);
};

export const FrequencyPenaltySlider = ({
	_frequencyPenalty,
	_setFrequencyPenalty,
}: {
	_frequencyPenalty: number;
	_setFrequencyPenalty: React.Dispatch<React.SetStateAction<number>>;
}) => {
	return (
		<div className="mt-5 pt-5 border-t border-gray-500">
			<label className="block text-sm font-medium text-gray-900 dark:text-white">
				Frequency Penalty: {_frequencyPenalty}
			</label>
			<input
				id="default-range"
				type="range"
				value={_frequencyPenalty}
				onChange={(e) => {
					_setFrequencyPenalty(Number(e.target.value));
				}}
				min={-2}
				max={2}
				step={0.1}
				className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
			/>
			<div className="min-w-fit text-gray-500 dark:text-gray-300 text-sm mt-2">
				Number between -2.0 and 2.0. Positive values penalize new tokens based
				on their existing frequency in the text so far, decreasing the model's
				likelihood to repeat the same line verbatim. (Default: 0)
			</div>
		</div>
	);
};

export default ConfigMenu;
