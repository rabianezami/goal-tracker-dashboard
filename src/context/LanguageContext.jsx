import { createContext, useCallback, useMemo } from "react"
import { useTranslation } from "react-i18next"

export const LanguageContext = createContext()

export function LanguageProvider({ children }) {

    const { i18n } = useTranslation()

    const toggleLanguage = useCallback(() => {
        const newLang = i18n.language === "fa" ? "en" : "fa"
        i18n.changeLanguage(newLang)
        localStorage.setItem("appLanguage", newLang)
    }, [i18n])

    const value = useMemo(() => ({
        language: i18n.language,
        toggleLanguage
    }), [i18n.language, toggleLanguage])

    return (
        <LanguageContext.Provider value={value}>
            {children}
        </LanguageContext.Provider>
    )
}