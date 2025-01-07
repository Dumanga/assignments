import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Assignment1 from "./assignments/ASG_2024_12_17_1";
import Assignment2 from "./assignments/ASG_2024_12_18_1";
import Assignment3 from "./assignments/ASG_2024_12_18_2";
import Assignment4 from "./assignments/ASG_2024_12_19_1";
import Assignment5 from "./assignments/ASG_2024_12_19_2"; 
import Assignment6 from "./assignments/ASG_2024_12_20_1";
import Assignment7 from "./assignments/ASG_2024_12_23_1";
import Assignment8 from "./assignments/ASG_2024_12_23_2";
import Assignment9 from "./assignments/ASG_2024_12_24_1";
import Assignment10 from "./assignments/ASG_2024_12_30_1";
import Assignment11 from "./assignments/ASG_2024_12_31_1";
import Assignment12 from "./assignments/ASG_2025_01_01_1";
import Assignment13 from "./assignments/ASG_2025_01_02_1";
import Assignment14 from "./assignments/ASG_2025_01_06_1";
import Assignment15 from "./assignments/ASG_2025_01_07_1";

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
        <Route path="/ASG_2024_12_23_1" element={<Assignment7 />} />
        <Route path="/ASG_2024_12_23_2" element={<Assignment8 />} />
        <Route path="/ASG_2024_12_24_1" element={<Assignment9 />} />
        <Route path="/ASG_2024_12_30_1" element={<Assignment10 />} />
        <Route path="/ASG_2024_12_31_1" element={<Assignment11 />} />
        <Route path="/ASG_2025_01_01_1" element={<Assignment12 />} />
        <Route path="/ASG_2025_01_02_1" element={<Assignment13 />} />
        <Route path="/ASG_2025_01_06_1" element={<Assignment14 />} />
        <Route path="/ASG_2025_01_07_1" element={<Assignment15 />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
