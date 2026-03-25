import { useParams } from "react-router"
import GoalForm from "../components/forms/GoalForm"
import { useGoals } from "../context/GoalsContext"

export default function EditGoalPage() {
    const { id } = useParams()
    const { goals } = useGoals()

   const goal = goals.find(g => g.id === Number(id))

    if(!goal) return <div>{t("messages.goalNotFound")}</div>

    return (
        <GoalForm defaultValues={goal}/>
    )
}