// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Auditorios from './Auditorios';
import AuditorioDetalle from './AuditorioDetalle';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Auditorios />} />
        <Route path="/auditorio/:edificio/:id" element={<AuditorioDetalle />} />
      </Routes>
    </Router>
  );
};

export default App;
