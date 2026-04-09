import { useState } from "react";
import GoalControl from "../components/GoalControls";
import GoalList from "../components/GoalList";
import { useGoals } from "../context/GoalsContext";
import { useNavigate } from "react-router-dom";
import useGoalCompletion from "../hooks/useGoalCompletion";
import { useTranslation } from "react-i18next";
import ConfirmDialog from "../components/dialog/ConfirmDialog";


export default function GoalLists() {
  const { goals, removeGoal, updateGoal } = useGoals();
  const navigate = useNavigate()
  const { t } = useTranslation("goalList");

  const { checkCompletion } = useGoalCompletion()


  const [filtertabs, setFilterTabs] = useState(0);
  const [searchText, setSearchText] = useState("");
  const [sortOption, setSortOption] = useState("newest");

  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

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
      return;
    }

    // for when not completed
    if (goal.progress < goal.target) {
      setSelectedId(id)
      setOpenConfirm(true);
      return
      
    }


    const updatedGoal = checkCompletion({ ...goal, status: "completed" });

    updateGoal(id, updatedGoal);
  }

  function handleOpenDetails(id) {
    navigate(`/goals/${id}`)
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
        onOpenDetails={handleOpenDetails}
      />
      
      <ConfirmDialog
  open={openConfirm}
  title={t("confirmIncompleteTitle")} 
  onClose={() => setOpenConfirm(false)}
  onConfirm={() => {
    if (selectedId !== null) {
      const goal = goals.find(g => g.id === selectedId);
      const updatedGoal = checkCompletion({ ...goal, status: "completed" });
      updateGoal(selectedId, updatedGoal);
    }
    setOpenConfirm(false);
    setSelectedId(null);
  }}
/>
    </>
  )

}
