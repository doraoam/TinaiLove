// In your App.js or where you define routes
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import HomePage from './components/HomePage';
import MainPage from './components/MainPage';
import AuthRoute from './components/AuthRoute';

function App() {
  return (
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/main" element={
          <AuthRoute>
            <MainPage />
          </AuthRoute>
        } />
        <Route path="*" element={<div>Page not found</div>} />
      </Routes>
  );
}

export default App;
