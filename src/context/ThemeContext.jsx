import { createContext, useCallback, useMemo, useState } from "react"

export const ThemeContext =  createContext()

export function ThemeProvider({ children }) {

    const saveMode = localStorage.getItem("appMode") || "light"
    const [mode, setMode] = useState(saveMode)

    const toggleMode = useCallback(() => {
        setMode(prev => {
            const newMode = prev === "light" ? "dark" : "light"
            localStorage.setItem("appMode", newMode)
            return newMode
        })
    }, [])

    const value = useMemo(() => ({
        mode,
        toggleMode
    }), [mode, toggleMode])

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}