// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PhotoGallery from "./components/PhotoGallery";
import PhotoDetail from "./components/PhotoDetail";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PhotoGallery />} />
          <Route path="/photos/:id" element={<PhotoDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
