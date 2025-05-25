import React from "react";
import "./App.css";
import RasElHekmaLanding1 from "./Pages/LandingPage/RasElHekmaLanding1";
import Login from "./Pages/Login/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import AdminProtected from "./components/AdminProtected";
import Dashboard from "./Pages/Dashborad/Dashboard";
// import RasElHekmaLanding2 from './Pages/LandingPage/RasElHekmaLanding2'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<RasElHekmaLanding1 />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <AdminProtected>
                <Dashboard />
              </AdminProtected>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
