import { Route, Routes } from "react-router-dom";
import protectedRoutes from "./ProtectedRoutes";
import AppLayout from "../layout/AppLayout";
import AuthLayout from "../layout/AuthLayout";
import PublicRoutesData from "./PublicRoutesData"
import PublicRoute from "./PublicRoutes";
export default function AppRoutes() {
    return (
        <Routes>
            {/* app pages */}
            <Route element={<AppLayout/>}>  
                {protectedRoutes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Route>

             {/* auth pages */} 
            <Route element={<AuthLayout />} >
                {PublicRoutesData.map((route, index) => (
                    <Route
                        key={index}
                        path={route.path}
                        element={
                            <PublicRoute>
                                {route.element}
                            </PublicRoute>
                        }
                    />
                ))}
            </Route>

        </Routes>
    )
}
