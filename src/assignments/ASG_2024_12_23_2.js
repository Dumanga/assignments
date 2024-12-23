import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

export default function Assignment8() {
  const [colors, setColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  const handleColors = (search = "") => {
    setLoading(true);
    axios
      .get(`https://apis.dnjs.lk/objects/colors.php?search=${search}`)
      .then((response) => {
        console.log(response);
        setColors(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    handleColors();
  }, []);

  const handleSearch = () => {
    handleColors(searchText);
  };

  return (
    <div style={{ marginLeft: "16px" }}>
      <h1>Assignment 7</h1>
      <h1>Color List</h1>
      <input
        type="text"
        placeholder="Search by color name"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button style={{ marginLeft: "16px" }} onClick={handleSearch} disabled={!searchText || loading}>
        Search
      </button>
      <button
        style={{ marginLeft: "16px" }}
        onClick={() => {
          handleColors();
          setSearchText("");
        }}
        disabled={!searchText || loading}
      >
        Reset
      </button>
      {loading ? (
        <CircularProgress />
      ) : colors.length === 0 ? (
        <p>No such color</p>
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
