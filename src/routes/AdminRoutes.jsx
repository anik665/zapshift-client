import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, roleLoading } = useRole();
  const location = useLocation();

  if (loading || roleLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Login করা নেই
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Login আছে কিন্তু admin না
  if (role !== "admin") {
    return <Navigate to="/forbidden" replace />;
  }

  return children;
};

export default AdminRoute;
