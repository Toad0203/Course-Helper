import Navbar from "./components/Navbar";
import CourseDetails from "./pages/CourseDetails";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FileUpload from "./pages/UploadFile";
import Test from "./pages/Test";

export default function App() {
  return (
    <>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/course" element={<CourseDetails />} />
          <Route path="/upload" element={<FileUpload />} />
          <Route path="/test" element={<Test />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </Router>
    </>
  );
}
