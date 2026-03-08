import { useState , useEffect } from "react";
import { loadGoals, saveGoals } from "../services/localStorageGoals";
import GoalControl from "../components/GoalControls";
import GoalList from "../components/GoalList";
export default function GoalListPage() {
const defaultGoals = [
  {
    id: 1,
    title: "readBooks",
    category: "study",
    progress: 60,
    date:  "Feb",
    color: "#4A90E2",
    status: "active"
  },
  {
    id: 2,
    title: "learnLanguage",
    category: "study",
    progress: 100,
    date: " 1st Mar",
    color: "#50C878",
    status: "completed"
  },
  {
    id: 3,
    title: "Exercize",
    category: "health",
    progress: 75,
    date: "Now",
    color: "#F5A623",
    status: "paused"
  },
  {
   id: 4,
   title: "saveMoney",
    category: "personal",
    progress: 55,
    date: " 11 Apr",
    color: "#4CAF50",
    status: "active"
  }
]
const [goal, setGoals] = useState(()=> loadGoals(defaultGoals))
useEffect(()=> {
  saveGoals(goal)
},[goal])
const [search , setSearch] = useState("");
const [tabs, setTabs] = useState(0);
const [sort, setSort] = useState("progress")

let filteredGoals = goal.filter((goal) =>
  goal.title?.toLowerCase().includes(search.toLowerCase())
)

if (tabs === 1) {
  filteredGoals = filteredGoals.filter((goal) => goal.status === "active");
}

if (tabs === 2) {
  filteredGoals = filteredGoals.filter((goal) => goal.status === "completed");
}

if (tabs === 3) {
  filteredGoals = filteredGoals.filter((goal) => goal.status === "paused");
}

if (sort === "progress") {
  filteredGoals.sort((a, b) => b.progress - a.progress);
}

if (sort === "category") {
  filteredGoals.sort((a, b) => a.category.localeCompare(b.category));
}

  function handleEdit(title){
    console.log("edit checked for title" ,title);
  }
  function handleDelete(id){
    setGoals(pre=> pre.filter(goal => goal.id !==id))
  }
  function handleToggleStatus(id){
    setGoals(pre => pre.map(goal => goal.id === id ? {...goal, status: goal.status === "paused" ?
      "active" : "completed"}: goal))
  }
  return (
   <>
    <GoalControl 
    setSearch={setSearch} search={search}
    tabs={tabs} setTabs={setTabs}
    sort={sort} setSort={setSort}/>

    <GoalList goals={filteredGoals}
    onEdit={handleEdit} onDelete={handleDelete} onToggleStatus={handleToggleStatus}/>
   </>
  )
}
