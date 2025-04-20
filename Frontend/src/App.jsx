import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom"
import { useSelector } from "react-redux";

import Layout from "./pages/Layout";
import Search from "./pages/Search";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import YourRides from "./pages/YourRides";
import PostRide from "./pages/PostRide";
import Messages from "./pages/Messages";
import UserProfile from "./pages/auth/UserProfile";
import ChangePassword from "./pages/auth/ChangePassword";
import SendPasswordResetEmail from "./pages/auth/SendPasswordResetEmail";
import ResetPassword from "./pages/auth/ResetPassword";
import LandingPage from "./pages/LandingPage";
import Vehicles from "./pages/Vehicles";

function App() {
  const { access_token } = useSelector((state) => state.auth);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public routes */}
            <Route index element={access_token ? <Navigate to="/search" /> : <LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/send-reset-password-email" element={<SendPasswordResetEmail />} />
            <Route path="api/user/reset/:id/:token" element={<ResetPassword />} />

            {/* Protected routes - redirect to login if not authenticated */}
            <Route path="/search" element={access_token ? <Search /> : <Navigate to="/login" />} />
            <Route path="/postride" element={access_token ? <PostRide /> : <Navigate to="/login" />} />
            <Route path="/yourrides" element={access_token ? <YourRides /> : <Navigate to="/login" />} />
            <Route path="/messages" element={access_token ? <Messages /> : <Navigate to="/login" />} />
            <Route path="/vehicles" element={access_token ? <Vehicles /> : <Navigate to="/login" />} />
            <Route path="/userprofile" element={access_token ? <UserProfile /> : <Navigate to="/login" />} />
            <Route path="/changepassword" element={access_token ? <ChangePassword /> : <Navigate to="/login" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App
