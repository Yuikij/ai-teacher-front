import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import TeacherListPage from './pages/TeacherListPage';
import ChatPage from './pages/ChatPage';
import UserProfilePage from './pages/UserProfilePage';
import MaterialsPage from './pages/MaterialsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <HomePage />
          </Layout>
        } />
        <Route path="/teachers" element={
          <Layout>
            <TeacherListPage />
          </Layout>
        } />
        <Route path="/teachers/:teacherId/chat" element={<ChatPage />} />
        <Route path="/user" element={
          <Layout>
            <UserProfilePage />
          </Layout>
        } />
        <Route path="/knowledge/materials" element={
          <Layout>
            <MaterialsPage />
          </Layout>
        } />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
