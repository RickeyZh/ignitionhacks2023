import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";

import Teacher from "./Pages/Teacher";
import Student from "./Pages/Student";

import Navbar from "./Components/Navbar";

export default function App() {
  return (
    <BrowserRouter>
      <div className="">
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/teacher" element={<Teacher />} />
        <Route path="/student" element={<Student />} />
      </Routes>
    </BrowserRouter>
  );
}
