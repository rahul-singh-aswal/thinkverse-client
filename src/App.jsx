import './App.css';

import { Routes, Route } from 'react-router-dom';

import React from 'react';
import HomePage from './Pages/HomePage';
import About from './Pages/About';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/about" element={<About />}></Route>
      </Routes>
    </>
  );
}

export default App;
