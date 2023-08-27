import "./App.css";
import { Route, Routes, Link } from "react-router-dom";
import Home from "./Pages/Home";

import Teacher from "./Pages/Teacher";
import Student from "./Pages/Student";
import About from "./Pages/About";
import Navbar from "./Components/Navbar";

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/ignitionhacks2023" element={<Home />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/student" element={<Student />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </>
  );
}
