import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../views/pages/LoginPage";
import MainLayout from "../views/layouts/MainLayout";
import AdminPage from "../views/pages/Admin/AdminPage";
import { Role } from "../enums/Role";
import ContentListPage from "../views/pages/Editor/ContentListPage";
import PreviewPage from "../views/pages/Editor/PreviewPage";
import EditContentPage from "../views/pages/Editor/EditContentPage";
import { useAuth } from "../contexts/AuthContext";

export default function AppRoutes() {
  const { role } = useAuth();

  const getRedirectPath = () => {
    if (!role) return "/login";
    if (role === Role.ADMIN) return "/admin";
    if (role === Role.EDITOR) return "/editor";
    return "/unauthorized";
  };

  return (
    <Routes>
      <Route path="/" element={<Navigate to={getRedirectPath()} />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<MainLayout allowedRoles={[Role.ADMIN]} />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>
      <Route element={<MainLayout allowedRoles={[Role.EDITOR]} />}>
        <Route path="/editor" element={<ContentListPage />} />
        <Route path="/editor/contents/:id/preview" element={<PreviewPage />} />
        <Route path="/editor/contents/:id/edit" element={<EditContentPage />} />
      </Route>

      <Route path="/unauthorized" element={<div>Unauthorized</div>} />
    </Routes>
  );
}
