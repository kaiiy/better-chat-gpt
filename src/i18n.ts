import i18n from "i18next";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const namespace = ["main", "api", "about", "model"];

i18n
	.use(Backend)
	.use(initReactI18next)
	.init({
		backend: {
			loadPath: "locales/{{lng}}/{{ns}}.json",
		},
		fallbackLng: {
			default: ["en"],
		},
		ns: namespace,
		defaultNS: "main",
		lng: "en",
	});

export default i18n;
