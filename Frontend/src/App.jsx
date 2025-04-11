import {BrowserRouter, Route, Routes } from 'react-router-dom'

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


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/send-reset-password-email" element={<SendPasswordResetEmail />} />
          <Route path="/api/user/reset/:id/:token" element={<ResetPassword />} />
          <Route path="/userprofile" element={<UserProfile />} />

          {/* Should be Protected routes */}
          <Route path="/search" element={<Search />} />
          <Route path="/postride" element={<PostRide />} />
          <Route path="/yourrides" element={<YourRides />} />
          <Route path="/messages" element={<Messages />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
