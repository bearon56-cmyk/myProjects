import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Header } from "./Components/Header";
import { useState } from "react";
import Home from "./Pages/Home";
import Write from "./Pages/Write";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/write" element={<Write></Write>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
