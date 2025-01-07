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
    }, {
      id: 7,
      title: "Assignment 7",
      description: "ASG_2024_12_23_1",
      location: "/ASG_2024_12_23_1",
    },{
      id: 8,
      title: "Assignment 8",
      description: "ASG_2024_12_23_2",
      location: "/ASG_2024_12_23_2",
    },{
      id: 9,
      title: "Assignment 9",
      description: "ASG_2024_12_24_1",
      location: "/ASG_2024_12_24_1",
    },{
      id: 10,
      title: "Assignment 10",
      description: "ASG_2024_12_30_1",
      location: "/ASG_2024_12_30_1",
    },{
      id: 11,
      title: "Assignment 11",
      description: "ASG_2024_12_31_1",
      location: "/ASG_2024_12_31_1",
    },{
      id: 12,
      title: "Assignment 12",
      description: "ASG_2025_01_01_1",
      location: "/ASG_2025_01_01_1",
    },{
      id: 13,
      title: "Assignment 13",
      description: "ASG_2025_01_02_1",
      location: "/ASG_2025_01_02_1",
    },{
      id: 14,
      title: "Assignment 14",
      description: "ASG_2025_01_06_1",
      location: "/ASG_2025_01_06_1",
    },{
      id: 15,
      title: "Assignment 15",
      description: "ASG_2025_01_07_1",
      location: "/ASG_2025_01_07_1",
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
