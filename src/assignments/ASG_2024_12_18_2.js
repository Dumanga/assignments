import {  useState } from "react";

export default function Assignment3() {
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

  const total = dataset.reduce((acc,num) => acc + num, 0);
  const average = dataset.length ? total / dataset.length :0;


  return (
    <>
      <div style={{ marginLeft: "16px" }}>
        <h1>Assignment 3</h1>

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
        <p>Total of the array: {total}</p>
        <p>Average of the array : {average}</p>
        <p>Added Data in the array : {dataset.join(", ")}</p>
        <ul>
          {dataset.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
