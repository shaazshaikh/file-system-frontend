import React, { useState, useContext } from "react";
import { UserContext } from "../context/userContext";
import "../css/Home.css";
import { Modal, Button, Form } from "react-bootstrap";
import { getFiles, uploadFile } from "../services/fileService";

function Home() {
  const [viewType, setViewType] = useState("All");
  const { user } = useContext(UserContext);
  const [currentFolder, setCurrentFolder] = useState("HomeFolder");
  const [newFolder, setNewFolder] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isFolderCreation, setIsFolderCreation] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [filesFetched, setFilesFetched] = useState([]);
  const [fileSelected, setFileSelected] = useState(null);

  const files = [
    { name: "File1.txt", modified: "2024-06-01", type: "File", size: "15KB" },
    { name: "Folder1", modified: "2024-06-02", type: "Folder", size: "15KB" },
    { name: "File2.txt", modified: "2024-06-03", type: "File", size: "15KB" },
    { name: "Folder2", modified: "2024-06-04", type: "Folder", size: "15KB" },
  ];

  const filteredFiles =
    viewType === "All" ? files : files.filter((file) => file.type === viewType);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleNewFolder = () => {
    setIsCreatingFolder(true);
    setFileSelected(null);
    handleShowModal();
  };

  const handleUploadFile = () => {
    setIsCreatingFolder(false);
    handleShowModal();
  };

  const createNewFolder = () => {
    if (newFolder) {
      const newFolderPath = `${currentFolder}/${newFolder}`;
      // call api to create new folder
      setNewFolder("");
      handleCloseModal();
    } else {
      alert("Enter folder name");
    }
  };

  const callUploadFile = async () => {
    const data = await uploadFile(fileSelected, currentFolder);
    if (data === null) {
      alert("Could not upload file");
    }
    handleCloseModal();
  };

  const callGetFiles = async () => {
    const data = await getFiles();
    setFilesFetched(data);
  };

  const fileChange = (event) => {
    setFileSelected(event.target.files[0]);
  };
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
          <button className="new-button">+ New Folder</button>
          <input
            type="text"
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
            placeholder="Enter new folder name"
          />

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
