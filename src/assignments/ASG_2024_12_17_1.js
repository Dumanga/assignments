import { useState } from "react";

export default function Assignment1() {
  const [selectedSection, setSelectedSection] = useState("");

  return (
    <div>
      <h1>Assignment 1</h1>
      <div style={{ marginLeft: "16px" }}>
        <button
          style={{ marginLeft: "16px" }}
          onClick={() => setSelectedSection("Section1")}
        >
          Section1
        </button>
        <button
          style={{ marginLeft: "16px" }}
          onClick={() => setSelectedSection("Section2")}
        >
          Section2
        </button>
        <button
          style={{ marginLeft: "16px" }}
          onClick={() => setSelectedSection("Section3")}
        >
          Section3
        </button>
        <button
          style={{ marginLeft: "16px" }}
          onClick={() => setSelectedSection("")}
        >
          Clear All
        </button>
      </div>

      <div style={{ marginLeft: "16px" }}>
        {selectedSection === "" ? (
          <p>Please Select a button</p>
        ) : selectedSection === "Section1" ? (
          <p>sec 1</p>
        ) : selectedSection === "Section2" ? (
          <p>sec 2</p>
        ) : (
          <p>sec 3</p>
        )}
      </div>
    </div>
  );
}