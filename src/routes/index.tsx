// src/routes/index.tsx
import { Routes, Route } from "react-router-dom";
import LoginPage from "../views/pages/LoginPage";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* <Route element={<MainLayout allowedRoles={["client"]} />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/contents/:id" element={<ContentDetailPage />} />
      </Route> */}

      <Route
        path="/unauthorized"
        element={<div>Không có quyền truy cập</div>}
      />
    </Routes>
  );
}
