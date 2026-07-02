import BasicInit from "./cases/BasicInit.jsx";
import Locales from "./cases/Locales.jsx";
import MandatoryFields from "./cases/MandatoryFields.jsx";

export const links = [
	{
		group: "",
		items: [
			["/base/:skin", "Basic Excel Import", BasicInit, { file: "BasicInit" }],
		],
	},
	{
		group: "Configuration",
		items: [
			["/locales/:skin", "Locales", Locales, { file: "Locales" }],
			["/mandatory/:skin", "Mandatory fields", MandatoryFields, { file: "MandatoryFields" }],
		],
	},
];
