import GoalCard from "../components/GoalCard";
import GoalControl from "../components/GoalControls";
import GoalList from "../components/GoalList";

const goals = [
  {
    title: "خواندن ۱۰ کتاب",
    category: "مطالعه",
    progress: 60,
    date: "دهم فبروری",
    color: "#4A90E2",
    status: "active"
  },
  {
    title: "یادگیری زبان جدید",
    category: "آموزش",
    progress: 100,
    date: "اول مارچ",
    color: "#50C878",
    status: "completed"
  },
  {
    title: "ورزش ۳ بار در هفته",
    category: "سلامتی",
    progress: 75,
    date: "حالا",
    color: "#F5A623",
    status: "paused"
  },
  {
    title: "پس‌انداز ۵۰۰۰ دلار",
    category: "شخصی",
    progress: 55,
    date: "یازدهم اوپریل",
    color: "#4CAF50",
    status: "active"
  }
];
export default function GoalLists() {
  function handleEdit(title){
    console.log("edit checked for title" ,title);
  }
  function handleDelete(title){
    console.log("delete checked", title);
  }
  function handleToggleStatus(title){
    console.log("toggle status", title);
  }
  return (
   <>
    <GoalControl/>
    <GoalList goals={goals}
    onEdit={handleEdit} onDelete={handleDelete} onToggleStatue={handleToggleStatus}/>
   </>
  )
  
}