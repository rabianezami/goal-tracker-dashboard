import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/DashboardPage";
import GoalLists from "../pages/GoalListPage";
import CreateGoal from "../pages/CreateGoalPage";
import EditGoalPage from "../pages/EditGoalPage";
import GoalDetails from "../pages/GoalDetailsPage";
import Categories from "../pages/CategoriesPage";
import Settings from "../pages/SettingsPage";
import NotFound from "../pages/NotFoundPage";
import AppLayout from "../layout/AppLayout";
import CategoryPage from "../components/categories/CategoryPage";
import Archive from "../pages/ArchivePage";

export default function AppRoutes(){
    return(
        <Routes>
            <Route element={<AppLayout/>}>  
                <Route path="/" element={<Dashboard/>}/>
                <Route path="/goals" element={<GoalLists/>}/>
                <Route path="/goals/new" element={<CreateGoal/>}/>
                <Route path="/goals/edit/:id" element={<EditGoalPage />}/> 
                <Route path="/goals/:id" element={<GoalDetails/>}/>
                <Route path="/category/:categoryName" element={<CategoryPage />} />
                <Route path="/categories" element={<Categories/>}/>
                <Route path="/settings" element={<Settings/>}/>
                <Route path="/goals/archive/:status" element={<Archive />} />
            </Route>

            <Route path="*" element={<NotFound/>}/>
        </Routes>
    )
}