// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";

import PenilaianKinerja from "./pages/PenilaianKinerja";
import ReportLayout from "./components/ReportLayout";

import PrivateRoute from "./components/PrivateRoute";

import Home from "./pages/Home";
import FunSession from "./pages/FunSession";
import FunSessionDetail from "./pages/FunSessionDetail";
import Reward from "./pages/Reward";
import ProfileIP from "./pages/ProfileIP";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/funsession"
          element={
            <PrivateRoute>
              <FunSession />
            </PrivateRoute>
          }
        />

        <Route
          path="/funsession/:id"
          element={
            <PrivateRoute>
              <FunSessionDetail />
            </PrivateRoute>
          }
        />

        <Route
          path="/performance"
          element={
            <PrivateRoute>
              <PenilaianKinerja />
            </PrivateRoute>
          }
        />

        <Route
          path="/reward"
          element={
            <PrivateRoute>
              <Reward />
            </PrivateRoute>
          }
        />

        <Route
          path="/training-report"
          element={
            <PrivateRoute>
              <ReportLayout />
            </PrivateRoute>
          }
        />

        {/* INI YANG PENTING BUAT PROFILE */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfileIP />
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={<h3 className="text-center mt-5">404 Not Found</h3>}
        />
      </Routes>
    </Router>
  );
}

export default App;
