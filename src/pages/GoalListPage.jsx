import GoalCard from "../components/GoalCard";
import GoalControl from "../components/GoalControls";
import GoalList from "../components/GoalList";
import { useGoals } from "../context/GoalsContext";

export default function GoalLists() {
const { goals, removeGoal, updateGoal } = useGoals();

  function handleEdit(id , updateData){
   updateGoal(id, updateData)
  }
  function handleDelete(id){
   removeGoal(id)
  }
  function handleToggleStatus(id){
    const goal = goals.find(g => g.id === id)

  const newStatus =
    goal.status === "completed" ? "active" : "completed"

  updateGoal(id, { status: newStatus })
  }
  return (
   <>
    <GoalControl/>
    <GoalList goals={goals}
    onEdit={handleEdit} onDelete={handleDelete} onToggleStatus={handleToggleStatus}/>
   </>
  )
  
}