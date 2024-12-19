import { useState } from "react";

export default function Assignment2() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [operation, setOperation] = useState("add");
  const [result, setResult] = useState(null);

  const operations = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    mul: (a, b) => a * b,
    div: (a, b) => a / b,
  };

  const handleCalculate = () => {
    if (firstNumber === "" || secondNumber === "") {
      return;
    }

    const num1 = parseFloat(firstNumber);
    const num2 = parseFloat(secondNumber);
    const result = operations[operation](num1, num2);

    setResult(result);
  };

  return (
    <div style={{ marginLeft: "16px" }}>
      <h1>Assignment 2</h1>
      <p>Mathematical Dropdown</p>
      <select value={operation} onChange={(e) => setOperation(e.target.value)}>
        <option value="add">Add</option>
        <option value="sub">Subtract</option>
        <option value="mul">Multiply</option>
        <option value="div">Divide</option>
      </select>
      <br />
      <br />
      <input
        type="number"
        placeholder="Enter first number"
        value={firstNumber}
        onChange={(e) => setFirstNumber(e.target.value)}
      />
      <br />
      <br />
      <input
        type="number"
        placeholder="Enter second number"
        value={secondNumber}
        onChange={(e) => setSecondNumber(e.target.value)}
      />
      <br />
      <br />
      {firstNumber !== "" && secondNumber !== "" && (
        <>
          <button onClick={handleCalculate}>Calculate</button>
          <button style={{ marginLeft: "16px" }} onClick={() => window.location.reload()}>Reset All</button>
        </>
      )}
      {result !== null && (
        <div>
          <h2>Result: {result}</h2>
        </div>
      )}
    </div>
  );
}
