import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import WelcomeScreen from './pages/WelcomeScreen';
import WelcomePage from './pages/WelcomePage';
import SearchPage from './pages/SearchPage';
import AboutUs from './pages/AboutUs';
import AuthPage from './pages/AuthPage';
import ProtectedPages from './pages/ProtectedPages';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<WelcomeScreen />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/home" element={<WelcomePage />} />
                  <Route element={<ProtectedPages/>} >
                  <Route path="/search" element={<SearchPage />} />
                  </Route>
                  {/* <Route path="/search" element={<SearchPage />} /> */}
                  <Route path="/about" element={<AboutUs />} />
                  <Route path="*" element={<Navigate to="/home" replace />} />
                </Routes>
              </>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;