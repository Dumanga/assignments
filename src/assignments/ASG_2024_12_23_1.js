import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function Assignment7() {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://dnjs.lk/colors.php")
      .then((response) => {
        console.log(response);
        setColors(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ marginLeft: "16px" }}>
      <h1>Assignment 7</h1>
      <h1>Color List</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <ul>
          {colors.map((color, index) => (
            <li key={index}>
              <span>{color.name}</span> --{" "}
              <span style={{ backgroundColor: color.code }}>{color.code}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}