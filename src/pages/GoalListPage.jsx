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
  return (
   <>
    <GoalControl/>
    <GoalList goals={goals}/>
   </>
  )
  
}