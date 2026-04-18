import Register from "../components/signup&login/Register";
import Login from "../components/signup&login/Login";
const publicRoutes = [
    {
        path: "/signup",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    }
    
]

export default publicRoutes;