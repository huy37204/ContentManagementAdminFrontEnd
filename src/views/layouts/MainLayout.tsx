import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../components/Header";

interface MainLayoutProps {
  allowedRoles: string[];
}

const MainLayout: React.FC<MainLayoutProps> = ({ allowedRoles }) => {
  const { isAuthenticated, role, isLoading } = useAuth();

  if (isLoading) {
    return;
  }
  if (!isAuthenticated) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(role!)) {
    return <Navigate to="/unauthorized" />;
  }

  return (
    <div className="min-w-[600px]">
      <Header />
      <main className="mt-4 sm:px-8 md:px-12 lg:px-16">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
