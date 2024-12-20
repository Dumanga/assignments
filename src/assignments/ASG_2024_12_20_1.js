import { useState } from "react";

export default function Assignment6() {
  const [style, setStyle] = useState([]);
  const [ruleName, setRuleName] = useState("");
  const [ruleValue, setRuleValue] = useState("");

  const addStyle = () => {
    setStyle([...style, { name: ruleName, value: ruleValue }]);
    setRuleName("");
    setRuleValue("");
  };

  const deleteStyle = (index) => {
    const newStyle = [...style];
    newStyle.splice(index, 1);
    setStyle(newStyle);
  };

  const cssObject = style.reduce(
    (obj, item) => ({ ...obj, [item.name]: item.value }),
    {}
  );

  return (
    <>
      <div style={{ marginLeft: "16px" }}>
        <h1>Assignment 5</h1>

        <div style={cssObject}>Sample Text</div>

        <input
          type="text"
          placeholder="Enter css rule name"
          value={ruleName}
          onChange={(e) => setRuleName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter css rule value"
          value={ruleValue}
          onChange={(e) => setRuleValue(e.target.value)}
          style={{ marginLeft: "16px" }}
        />
        <button onClick={addStyle} style={{ marginLeft: "16px" }}>
          Add CSS to the text
        </button>

        <br />

        <p>Added Rules list</p>

        <ul>
          {style.map((item, index) => (
            <li key={index}>
              {item.name}: {item.value}
              <button
                onClick={() => deleteStyle(index)}
                style={{ marginLeft: "16px", marginTop: 16 }}
              >
                Delete CSS
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
