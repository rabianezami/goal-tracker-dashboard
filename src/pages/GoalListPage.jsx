import { useNavigate } from "react-router-dom";
import GoalControl from "../components/GoalControls";
import GoalList from "../components/GoalList";

const goals = [
  {
    id: 1,
    title: "خواندن ۱۰ کتاب",
    category: "مطالعه",
    progress: 60,
    date: "دهم فبروری",
    color: "#4A90E2",
    status: "active"
  },
  {
    id: 2,
    title: "یادگیری زبان جدید",
    category: "آموزش",
    progress: 100,
    date: "اول مارچ",
    color: "#50C878",
    status: "completed"
  },
  {
    id: 3,
    title: "ورزش ۳ بار در هفته",
    category: "سلامتی",
    progress: 75,
    date: "حالا",
    color: "#F5A623",
    status: "paused"
  },
  {
    id: 4,
    title: "پس‌انداز ۵۰۰۰ دلار",
    category: "شخصی",
    progress: 55,
    date: "یازدهم اوپریل",
    color: "#4CAF50",
    status: "active"
  }
];

export default function GoalLists() {
  const navigate = useNavigate();

  function handleEdit(id) {
    console.log("edit", id);
  }

  function handleDelete(id) {
    console.log("delete", id);
  }

  function handleToggleStatus(id) {
    console.log("toggle status", id);
  }

  function handleOpenDetails(id) {
    navigate(`/goals/${id}`);
  }

  return (
    <>
      <GoalControl />

      <GoalList
        goals={goals}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleStatus={handleToggleStatus}
        onOpenDetails={handleOpenDetails}
      />
    </>
  );
}