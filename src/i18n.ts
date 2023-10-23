import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || undefined;

const namespace = ["main", "api", "about", "model"];
if (googleClientId) namespace.push("drive");

i18n
	.use(Backend)
	.use(LanguageDetector)
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
