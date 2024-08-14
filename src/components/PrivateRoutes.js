import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoutes({ children, permittedRoles }) {
    const { user } = useAuth()

    if(!user && localStorage.getItem("token")) {
        return <p>Loading...</p>
    }

    if(!user) {
        return <Navigate to="/" />
    }

    if(!permittedRoles.includes(user&&user.role)) {
        return <Navigate to="/unauthorized" />
    }

    return children
}