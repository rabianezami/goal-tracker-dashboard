import { sampleGoals } from "../data/sampleGoals"
import { createContext, useContext, useEffect, useState } from "react"

const GoalsContext = createContext()

export function GoalsProvider({ children }) {

  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem("goals");
    return saved ? JSON.parse(saved) : sampleGoals;
  })

  useEffect(() => {
    localStorage.setItem("goals", JSON.stringify(goals))
  }, [goals])

 
  const addGoal = (goal) => {
    setGoals((prev) => {

      const realGoals = prev.filter(
        g => !g.id.toString().startsWith("sample")
      )

      const newGoal = {
        id: Date.now(),
        progress: 0,
        status: "active",
        logs: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...goal
      }

      return [...realGoals, newGoal]
    })
  }

  const removeGoal = (id) => {
    setGoals((prev) => prev.filter(goal => goal.id !== id))
  }

  const updateGoal = (id, updatedData) => {
    setGoals((prev) => prev.map(goal => 
      goal.id === id ? { ...goal, ...updatedData, updatedAt: new Date().toISOString() } : goal
    ))
  }


  const addProgress = (id, amount = 1) => {
    setGoals((prev) => prev.map(goal => {
      if (goal.id === id) {
        const newProgress = goal.progress + amount
        const updatedGoal = {
          ...goal,
          progress: newProgress,
          logs: [...goal.logs, { date: new Date().toISOString(), amount }],
          updatedAt: new Date().toISOString()
        }
     
        if (goal.target && newProgress >= goal.target) {
          updatedGoal.status = "completed"
        }
        return updatedGoal
      }
      return goal
    }))
  }

 
  const markComplete = (id) => {
    setGoals((prev) => prev.map(goal => 
      goal.id === id ? { ...goal, status: "completed", updatedAt: new Date().toISOString() } : goal
    ))
  }

  return (
    <GoalsContext.Provider value={{
      goals,
      addGoal,
      removeGoal,
      updateGoal,
      addProgress,
      markComplete,
      setGoals
    }}>
      {children}
    </GoalsContext.Provider>
  )
}

export const useGoals = () => useContext(GoalsContext)