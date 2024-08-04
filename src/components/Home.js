import React, { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import "../css/Home.css";

function Home() {
  const [viewType, setViewType] = useState("All");
  const { user } = useContext(UserContext);

  const files = [
    { name: "File1.txt", modified: "2024-06-01", type: "File", size: "15KB" },
    { name: "Folder1", modified: "2024-06-02", type: "Folder", size: "15KB" },
    { name: "File2.txt", modified: "2024-06-03", type: "File", size: "15KB" },
    { name: "Folder2", modified: "2024-06-04", type: "Folder", size: "15KB" },
  ];

  const filteredFiles =
    viewType === "All" ? files : files.filter((file) => file.type === viewType);

  return (
    <div className="home-container">
      <div className="sidebar">
        <ul>
          <li>Home</li>
          <li>Trash</li>
          <li>Storage</li>
        </ul>
      </div>
      <div className="main-content">
        <div className="top-bar">
          <button className="new-button">+ New</button>
          <div className="view-toggle">
            <button
              className={viewType === "All" ? "active" : ""}
              onClick={() => setViewType("All")}
            >
              All
            </button>
            <button
              className={viewType === "File" ? "active" : ""}
              onClick={() => setViewType("File")}
            >
              Files
            </button>
            <button
              className={viewType === "Folder" ? "active" : ""}
              onClick={() => setViewType("Folder")}
            >
              Folders
            </button>
          </div>
          <div className="top-right-icons">
            <div className="settings-icon">⚙️</div>
            <div className="profile-icon">{user[0].toUpperCase()}</div>
          </div>
        </div>
        <table className="files-folders-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Modified</th>
              <th>Type</th>
              <th>Size</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFiles.map((file, index) => {
              return (
                <tr key={index}>
                  <td>{file.name}</td>
                  <td>{file.modified}</td>
                  <td>{file.type}</td>
                  <td>{file.size}</td>
                  <td>⋮</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Home;
