import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Classes from "./pages/Classes";
import AddClass from "./pages/AddClass";
import ClassPage from "./pages/ClassPage";
import Student from "./pages/Student";
import Layout from "./components/Layout";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/classes/add-class" element={<AddClass />} />
            <Route path="/class/:classId" element={<ClassPage />} />
            <Route path="/class/:classId/:studentId" element={<Student />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
