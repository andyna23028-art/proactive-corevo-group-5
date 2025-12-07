import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import PenilaianKinerja from './pages/PenilaianKinerja';
import TrainingReport from './pages/TrainingReport';
import ReportLayout from './components/ReportLayout';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home'; 
import FunSession from './pages/FunSession'; 
import FunSessionDetail from "./pages/FunSessionDetail";
import Reward from './pages/Reward';
import ProfileIP from './pages/ProfileIP';
import "./App.css";


function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes */}

        {/* Home */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        {/* Fun Session list */}
        <Route
          path="/funsession"
          element={
            <PrivateRoute>
              <FunSession />
            </PrivateRoute>
          }
        />

        {/* Fun Session detail (Start Session → masuk sini) */}
        <Route
          path="/funsession/:id"
          element={
            <PrivateRoute>
              <FunSessionDetail />   {/* ← ini yang benar bos muda */}
            </PrivateRoute>
          }
        />

        {/* Performance / Penilaian Kinerja */}
        <Route
          path="/performance"
          element={
            <PrivateRoute>
              <PenilaianKinerja />
            </PrivateRoute>
          }
        />

        {/* Reward */}
        <Route
          path="/reward"
          element={
            <PrivateRoute>
              <Reward />
            </PrivateRoute>
          }
        />

        {/* Training Report */}
        <Route
          path="/training-report"
          element={
            <PrivateRoute>
              <ReportLayout />
            </PrivateRoute>
          }
        />

        {/* Profile IP */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfileIP />
            </PrivateRoute>
          }
        />

        {/* 404 */}
        <Route path="*" element={<h3 className="text-center mt-5">404 Not Found</h3>} />
      </Routes>
    </Router>
  );
}

export default App;
