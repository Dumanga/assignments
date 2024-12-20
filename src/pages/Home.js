import React from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const Assignments = [
    {
      id: 1,
      title: "Assignment 1",
      description: "ASG_2024_12_17_1",
      location: "/ASG_2024_12_17_1",
    },
    {
      id: 2,
      title: "Assignment 2",
      description: "ASG_2024_12_18_1",
      location: "/ASG_2024_12_18_1",
    },
    {
      id: 3,
      title: "Assignment 3",
      description: "ASG_2024_12_18_2",
      location: "/ASG_2024_12_18_2",
    },
    {
      id: 4,
      title: "Assignment 4",
      description: "ASG_2024_12_19_1",
      location: "/ASG_2024_12_19_1",
    },
    {
      id: 5,
      title: "Assignment 5",
      description: "ASG_2024_12_19_2",
      location: "/ASG_2024_12_19_2",
    },
    {
      id: 6,
      title: "Assignment 6",
      description: "ASG_2024_12_20_1",
      location: "/ASG_2024_12_20_1",
    },
  ];

  return (
    <div className="assignment-body">
      <div className="card-grid-container">
        <h1 className="grid-title">Assignments List</h1>
        <h3 className="grid-subtitle">Click on the assignment to view</h3>
        <div className="card-grid">
          {Assignments.map((card) => (
            <div
              key={card.id}
              className="card"
              onClick={() => navigate(card.location)}
            >
              <h2>{card.title}</h2>
              <p>{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
