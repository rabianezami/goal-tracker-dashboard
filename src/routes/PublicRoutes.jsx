import Register from "../components/signup&login/Register";
import LandingPage from "../pages/LandingPage";

const publicRoutes = [
    {
        path: "/signup",
        element: <Register />
    },
    {
        path: "/home",
        element: <LandingPage />
    }
    
]

export default publicRoutes;