import React, { useState, useEffect } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { Pagination } from "@mui/material";

export default function Assignment9() {
  const [colors, setColors] = useState([]);
  const [allColors, setAllColors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const handleColors = (search = "", currentPage = page) => {
    setLoading(true);
    axios
      .get(
        `https://apis.dnjs.lk/objects/colors.php?search=${search}&page=${currentPage}&limit=${limit}`
      )
      .then((response) => {
        console.log(response);
        setColors(Array.isArray(response.data.data) ? response.data.data : []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const getAllColors = (search = "") => {
    axios
      .get(`https://apis.dnjs.lk/objects/colors.php?search=${search}`)
      .then((response) => {
        console.log(response);
        setAllColors(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    handleColors();
    getAllColors();
  }, []);

  const handleSearch = () => {
    handleColors(searchText, 1);
    getAllColors(searchText);
    setPage(1);
  };
  console.log(allColors.length);
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
      <button
        style={{ marginLeft: "16px" }}
        onClick={handleSearch}
        disabled={!searchText || loading}
      >
        Search
      </button>
      <button
        style={{ marginLeft: "16px" }}
        onClick={() => {
          handleColors();
          setSearchText("");
          getAllColors();
          setPage(1);
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
      <br />
      <br />

      <Pagination
        count={Math.ceil(allColors.length / limit)}
        page={page}
        onChange={(event, value) => {
          setPage(value);
          handleColors(searchText, value);
        }}
        color="primary"
      />
    </div>
  );
}
