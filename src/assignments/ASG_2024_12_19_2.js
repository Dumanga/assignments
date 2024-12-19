import { useState } from "react";

export default function Assignment5() {
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

  const handleSort = (order) => {
    return () => {
      console.log("Clicked Sort" + order);
      const newDataset = [...dataset];
      if (order === "ASC") {
        newDataset.sort((a, b) => a - b);
      } else {
        newDataset.sort((a, b) => b - a);
      }
      setDataset(newDataset);
    };
  };

  const handleMove = (index, moveType) => {
    const newDataset = [...dataset];
    if (moveType === "Right") {
      // MoveDown
      [newDataset[index], newDataset[index + 1]] = [
        newDataset[index + 1],
        newDataset[index],
      ];
    } else if (moveType === "Left") {
      // MoveUp
      [newDataset[index], newDataset[index - 1]] = [
        newDataset[index - 1],
        newDataset[index],
      ];
    }
    setDataset(newDataset);
  };

  return (
    <>
      <div style={{ marginLeft: "16px" }}>
        <h1>Assignment 5</h1>

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
        {dataset.length > 0 && (
          <>
            <p>Sort Data By :</p>
            <button onClick={handleSort("ASC")}>Ascending</button>
            <button onClick={handleSort("DESC")} style={{ marginLeft: 16 }}>
              Desending
            </button>
          </>
        )}
        <p>Added Data in the array : {dataset.join(", ")}</p>
        <ul>
          {dataset.map((item, index) => (
            <>
              <li key={index}>{item}</li>
              <button onClick={handleItemDelete(index)}>Delete</button>
              <button
                onClick={() => handleMove(index, "Left")}
                style={{ marginLeft: 16 }}
                disabled={index === 0}
              >
                Move Up
              </button>
              <button
                onClick={() => handleMove(index, "Right")}
                style={{ marginLeft: 16 }}
                disabled={index === dataset.length - 1}
              >
                Move Down
              </button>
            </>
          ))}
        </ul>
      </div>
    </>
  );
}
