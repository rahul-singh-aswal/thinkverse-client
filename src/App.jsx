import './App.css';

import { Routes, Route } from 'react-router-dom';

import React from 'react';
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import NotFound from './Pages/NotFound';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Courses from './Pages/Course/CourseList';
import Contact from './Pages/Contact';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
