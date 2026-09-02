import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    // Get JWT token from localStorage
    const token = localStorage.getItem("token");


    // If token does not exist,
    // redirect user to Login page
    if (!token) {
        return <Navigate to="/login" replace />;
    }


    // If token exists,
    // allow user to access the requested page
    return children;
}

export default ProtectedRoute;