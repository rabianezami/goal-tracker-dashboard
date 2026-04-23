import Register from "../components/signup&login/Register";
import LandingPage from "../pages/LandingPage";
import Login from "../components/signup&login/Login";

const PublicRoutesData = [
    {
        path: "/",
        element: <LandingPage />
    },
    {
        path: "/signup",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    }
]

export default PublicRoutesData;