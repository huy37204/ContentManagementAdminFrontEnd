// src/routes/index.tsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "../views/pages/LoginPage";
import MainLayout from "../views/layouts/MainLayout";
import AdminPage from "../views/pages/AdminPage";
import { Role } from "../enums/Role";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<MainLayout allowedRoles={[Role.ADMIN]} />}>
        <Route path="/admin" element={<AdminPage />} />
      </Route>

      <Route
        path="/unauthorized"
        element={<div>Không có quyền truy cập</div>}
      />
    </Routes>
  );
}
