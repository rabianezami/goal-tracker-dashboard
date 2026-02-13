import i18n from "il8next"
import { initReactI18next } from "react-i18next"

const savedLanguage = localStorage.getItem("appLanguage") || "en"

i18n.use(initReactI18next).init({
    resources: {
        en: { translation: { welcome: "My Goal" } },
        fa: { translation: { welcome: "مسیر من" } },
    },
    lng: savedLanguage,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
})

export default il8n;