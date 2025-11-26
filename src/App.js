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
import Reward from './pages/Reward';
import ProfileIP from './pages/ProfileIP';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected routes */}

        {/* Rute Halaman Home */}
        <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        
        {/* Rute Halaman Fun Session */}
        <Route path="/funsession" element={<PrivateRoute><FunSession /></PrivateRoute>} />

        {/* Rute Halaman Performance/Penilaian Kinerja */}
        <Route
            path="/performance"
            element={<PrivateRoute><PenilaianKinerja /></PrivateRoute>}
        />

        {/* Rute Halaman Reward */}
        <Route path="/reward" element={<PrivateRoute><Reward /></PrivateRoute>} />

        {/* Rute Halaman Training Report */}
        <Route
          path="/training-report"
          element={<PrivateRoute><ReportLayout /></PrivateRoute>}
        />

        {/* Route untuk Halaman Profile */}
        <Route 
          path="/profile" 
          element={<PrivateRoute><ProfileIP /></PrivateRoute>} />

        

        {/* Rute-rute kosong lainnya sebagai protected route agar Navbar berfungsi */}
        {/* <Route path="/home" element={<PrivateRoute><h3 className="text-center mt-5">Home Page (Protected)</h3></PrivateRoute>} />
        <Route path="/funsession" element={<PrivateRoute><h3 className="text-center mt-5">Fun Session Page (Protected)</h3></PrivateRoute>} />
        <Route path="/reward" element={<PrivateRoute><h3 className="text-center mt-5">Reward Page (Protected)</h3></PrivateRoute>} /> */}

        {/* Fallback 404 */}
        <Route path="*" element={<h3 className="text-center mt-5">404 Not Found</h3>} />
      </Routes>
    </Router>
  );
}

export default App;