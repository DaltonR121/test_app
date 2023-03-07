import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import Signup from "./components/Signup";
import List from "./components/List";
import styles from './index.css';

function App() {
  return (
    <Router>
      <div className="h-screen">
        <Navbar />
        <Routes>
        <Route exact path="/" element={<Home />} />
          <Route exact path="/:id" element={<List />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
