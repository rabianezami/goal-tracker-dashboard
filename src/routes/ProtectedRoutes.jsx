import Dashboard from "../pages/DashboardPage";
import GoalLists from "../pages/GoalListPage";
import CreateGoal from "../pages/CreateGoalPage";
import EditGoalPage from "../pages/EditGoalPage";
import GoalDetails from "../pages/GoalDetailsPage";
import Categories from "../pages/CategoriesPage";
import Settings from "../pages/SettingsPage";
import NotFound from "../pages/NotFoundPage";
import CategoryPage from "../components/categories/CategoryPage";
import Archive from "../pages/ArchivePage";

const protectedRoutes = [
    {
        path: "/",
        element: <Dashboard />
    },
    {
        path: "/goals",
        element: <GoalLists />
    },
    {
        path: "/goals/new",
        element: <CreateGoal />
    },
    {
        path: "/goals/:id",
        element: <GoalDetails />
    },
    {
        path: "/goals/edit/:id",
        element: <EditGoalPage />
    },
    {
        path: "/category/:categoryName",
        element: <CategoryPage />
    },
    {
        path: "/categories",
        element: <Categories />
    },
    {
        path: "/settings",
        element: <Settings />
    },
    {
        path: "/categories",
        element: <Categories />
    },
    {
        path: "/goals/archive/:status",
        element: <Archive />
    },
    {
        path: "*",
        element: <NotFound />
    }
]

export default protectedRoutes;