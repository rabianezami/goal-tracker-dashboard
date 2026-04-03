import { useState } from "react";
import GoalControl from "../components/GoalControls";
import GoalList from "../components/GoalList";
import { useGoals } from "../context/GoalsContext";
import { useNavigate } from "react-router-dom";
import useGoalCompletion from "../hooks/useGoalCompletion";

export default function GoalLists() {
  const { goals, removeGoal, updateGoal} = useGoals();
  const navigate = useNavigate()

   const { checkCompletion } = useGoalCompletion()


  const [filtertabs, setFilterTabs] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  function handleEdit(id) {
    navigate(`/goals/edit/${id}`)
  }

  function handleDelete(id) {
    removeGoal(id)
  }

  function handleToggleStatus(id) {
    const goal = goals.find(g => g.id === id);
    if (!goal) return;

    if (goal.status === "completed") {
      updateGoal(id, { status: "active" });
    } else {
      updateGoal(id, { status: "completed" });
    }

    const finalGoal = checkCompletion(updateGoal)

    updateGoal(id, finalGoal)
  }

  function handleAddProgress(id) {
    navigate(`/goals/${id}`);
  }

  let filteredGoals =
    filtertabs === 0
      ? goals
      : filtertabs === 1
        ? goals.filter(g => g.status === "active")
        : filtertabs === 2
          ? goals.filter(g => g.status === "completed")
          : goals.filter(g => g.status === "paused");

  if (searchText) {
    filteredGoals = filteredGoals.filter(g =>
      g.title?.toLowerCase().includes(searchText.toLowerCase())
    )
  }
  if (sortOption === "progress") {
    filteredGoals = [...filteredGoals].sort((a, b) => b.progress - a.progress)
  }
  else if (sortOption === "newest") {
    filteredGoals = [...filteredGoals].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    )
  }
  else if (sortOption === "category") {
    filteredGoals = [...filteredGoals].sort(
      (a, b) => a.category.localeCompare(b.category)
    )
  }
  return (
    <>
      <GoalControl
        filterTabs={filtertabs}
        setFilterTabs={setFilterTabs}
        searchText={searchText}
        setSearchText={setSearchText}
        sortOption={sortOption}
        setSortOption={setSortOption}
      />

      <GoalList
        goals={filteredGoals}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onAddProgress={handleAddProgress}
      />
    </>
  )

}
