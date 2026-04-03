import { useParams } from "react-router"
import GoalForm from "../components/forms/GoalForm"
import { useGoals } from "../context/GoalsContext"
import { useTranslation } from "react-i18next"

export default function EditGoalPage() {
    const { t } = useTranslation()
    const { id } = useParams()
    const { goals } = useGoals()

    const goal = goals.find(g => String(g.id) === id)  // ← اصلاح شد

    if(!goal) return <div>{t("messages.goalNotFound")}</div>

    return (
        <GoalForm defaultValues={goal}/>
    )
}