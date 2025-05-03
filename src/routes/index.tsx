// src/routes/index.tsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "../views/pages/LoginPage";
import MainLayout from "../views/layouts/MainLayout";
import AdminPage from "../views/pages/Admin/AdminPage";
import { Role } from "../enums/Role";
import ContentListPage from "../views/pages/Editor/ContentListPage";
import PreviewPage from "../views/pages/Editor/PreviewPage";
import EditContentPage from "../views/pages/Editor/EditContentPage";

export default function AppRoutes() {
  return (
    <Routes>
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
