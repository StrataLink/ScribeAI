import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import Speech from "./pages/Speech";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/speech" element={<Speech />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/main/:entryCode" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
