import { createContext, useContext, useEffect, useState } from "react"

 const GoalsContext = createContext()

export function GoalsProvider({ children }) {
    const [goals, setGoals] = useState(() => {
        const saved = localStorage.getItem("goals")
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem("goals", JSON.stringify(goals))
    }, [goals])

    const addGoal = (goal) => {
        setGoals((prev) => [...prev, {id: Date.now(), ...goal}])
    }

    const removeGoal = (id) => {
        setGoals((prev) => prev.filter(goal => goal.id !== id))
    }

    return (
        <GoalsContext.Provider value={{ goals, addGoal, removeGoal }}>
            {children}
        </GoalsContext.Provider>
    )
}

export const useGoals = () => useContext(GoalsContext)