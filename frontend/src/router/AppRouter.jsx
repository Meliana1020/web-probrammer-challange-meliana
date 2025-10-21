import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/login";
import Dashboard from "../pages/dashboard";
import Register from "../pages/register";
import useAuthStore from "../store/useAuthStore";
import AppLayout from "@/components/AppLayout";

export default function AppRouter() {
  const { isAuthenticated } = useAuthStore();

  return (
    <Router>
       <AppLayout>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
        />
      </Routes>
      </AppLayout>
    </Router>
  );
}
