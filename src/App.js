import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Assignment1 from "./assignments/ASG_2024_12_17_1";
import Assignment2 from "./assignments/ASG_2024_12_18_1";
import Assignment3 from "./assignments/ASG_2024_12_18_2";
import Assignment4 from "./assignments/ASG_2024_12_19_1";
import Assignment5 from "./assignments/ASG_2024_12_19_2"; 
import Assignment6 from "./assignments/ASG_2024_12_20_1";

function App() {
  return (
    // HashRouter is used to becz of github pages 
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ASG_2024_12_17_1" element={<Assignment1 />} />
        <Route path="/ASG_2024_12_18_1" element={<Assignment2 />} />
        <Route path="/ASG_2024_12_18_2" element={<Assignment3 />} />
        <Route path="/ASG_2024_12_19_1" element={<Assignment4 />} />
        <Route path="/ASG_2024_12_19_2" element={<Assignment5 />} />
        <Route path="/ASG_2024_12_20_1" element={<Assignment6 />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
