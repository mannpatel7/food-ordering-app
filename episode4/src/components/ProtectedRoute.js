import { useAppContext } from "../context/appcontext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const { isLoggedIn, user, loading } = useAppContext();


  if (loading) {
    return <h2 className="text-center mt-10">Checking authentication...</h2>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }


  if (role && user?.role !== role) {
    return <h2 className="text-center mt-10 text-red-500">Access Denied</h2>;
  }

  return children;
};

export default ProtectedRoute;