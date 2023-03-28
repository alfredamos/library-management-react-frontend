import { Navigate } from "react-router-dom";

interface AdminRoutePop {
  isAdmin: boolean;
  children: React.ReactNode;
}

export const AdminRoute = ({ isAdmin, children }: AdminRoutePop) => {
  if (!isAdmin) return <Navigate to="/not-allowed" replace />;
  return <>{children}</>;
};
