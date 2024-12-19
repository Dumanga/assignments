import { useState } from "react";

export default function Assignment4() {
  const [inputNumber, setInputNumber] = useState("");
  const [dataset, setDataset] = useState([]);

  const handleAdd = () => {
    console.log("Add button clicked");
    const number = parseFloat(inputNumber);
    if (!isNaN(number)) {
      setDataset([...dataset, number]);
    }
    setInputNumber("");
  };


  const handleItemDelete = (index) => {
    console.log("Clicked" + index);
    return () => {
      const newDataset = [...dataset];
      newDataset.splice(index, 1);
      setDataset(newDataset);
    };
  };

  return (
    <>
      <div style={{ marginLeft: "16px" }}>
        <h1>Assignment 4</h1>

        <input
          type="number"
          placeholder="Enter a number"
          value={inputNumber}
          onChange={(e) => setInputNumber(e.target.value)}
        />
        <button style={{ marginLeft: "16px" }} onClick={handleAdd}>
          Add
        </button>
      </div>
      <div style={{ marginLeft: "16px" }}>
        <p>Added Data in the array : {dataset.join(", ")}</p>
        <ul>
          {dataset.map((item, index) => (
            <>
              <li key={index}>{item}</li>
              <button onClick={handleItemDelete(index)}>Delete</button>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}
