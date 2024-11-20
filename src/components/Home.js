import React, { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../context/userContext";
import "../css/Home.css";
import { Modal, Button, Form } from "react-bootstrap";
import {
  getFolderContents,
  uploadFileInChunks,
  createFolder,
  getDetailsOfHomeFolder,
  getDetailsOfFolder,
  downloadFile,
} from "../services/fileService";

function Home() {
  const [viewType, setViewType] = useState("All");
  const { user, loading } = useContext(UserContext);
  const [currentFolder, setCurrentFolder] = useState("home");
  const [folderPath, setFolderPath] = useState("home");
  const [newFolder, setNewFolder] = useState("");
  const [showModal, setShowModal] = useState(false);
  // const [isFolderCreation, setIsFolderCreation] = useState(false);
  const [isCreatingFolder, setIsCreatingFolder] = useState(false);
  const [folderDetails, setFolderDetails] = useState(null);
  const [folderContentsFetched, setFolderContentsFetched] = useState([]);
  const [fileSelected, setFileSelected] = useState(null);
  const [currentFolderId, setCurrentFolderId] = useState(null);

  const dropdownRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenuIndex(null); // Close the dropdown if clicking outside
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const getHomeFolderDetails = async () => {
      return getDetailsOfHomeFolder(currentFolder).then((detailsOfFolder) => {
        setFolderDetails(detailsOfFolder);
        setCurrentFolderId(detailsOfFolder.id);
        setCurrentFolder(detailsOfFolder.folderName);
      });
    };
    getHomeFolderDetails();
  }, []);

  useEffect(() => {
    if (currentFolderId) {
      callGetFolderContents();
    }
  }, [currentFolderId]);

  // const files = [];

  const filteredContents =
    viewType === "All"
      ? folderContentsFetched
      : folderContentsFetched.filter((content) => content.type === viewType);

  const CallShowModal = () => setShowModal(true);
  const CallCloseModal = () => setShowModal(false);

  const handleNewFolder = () => {
    setIsCreatingFolder(true);
    setFileSelected(null);
    CallShowModal();
  };

  const handleUploadFile = () => {
    setIsCreatingFolder(false);
    CallShowModal();
  };

  const createNewFolder = async () => {
    if (newFolder) {
      const newFolderPath = `${folderDetails.folderPath}/${newFolder}`;
      const data = await createFolder(
        currentFolderId,
        newFolderPath,
        newFolder
      );
      if (data === null) {
        alert("Could not create folder");
      } else {
        await callGetFolderContents();
      }
      setNewFolder("");
      CallCloseModal();
    } else {
      alert("Enter folder name");
    }
  };

  const callUploadFile = async () => {
    if (fileSelected) {
      const data = await uploadFileInChunks(
        fileSelected,
        folderPath,
        currentFolderId
      );
      if (data === null) {
        alert("Could not upload file");
      } else {
        await callGetFolderContents();
      }
      CallCloseModal();
    } else {
      alert("Enter file name");
    }
  };

  const callGetFolderContents = async () => {
    const data = await getFolderContents(currentFolderId);
    setFolderContentsFetched(data);
  };

  const fileChange = (event) => {
    setFileSelected(event.target.files[0]);
  };
  const [openMenuIndex, setOpenMenuIndex] = useState(null);

  const toggleMenu = (index) => {
    setOpenMenuIndex(openMenuIndex === index ? null : index);
  };

  const handleDownload = async (fileUri) => {
    await downloadFile(fileUri);
  };

  const handleDelete = (fileName) => {
    alert(`Delete ${fileName}`);
  };

  // const sampleFunction = () => {
  //   console.log("Inside sampleFunction");
  // };

  const handleFolderClick = async (folder) => {
    const detailsOfFolder = await getDetailsOfFolder(folder.id);
    // const detailsOfFolder1 = await sampleFunction();
    setFolderDetails(detailsOfFolder);
    setCurrentFolderId(folder.id);
    setCurrentFolder(folder.name);
    setFolderPath(`${detailsOfFolder.folderPath}`);
  };

  const handleBackClick = async () => {
    const detailsOfFolder = await getDetailsOfFolder(
      folderDetails.parentFolderId
    );
    setFolderDetails(detailsOfFolder);
    setCurrentFolderId(detailsOfFolder.id);
    setCurrentFolder(detailsOfFolder.folderName);
    setFolderPath(`${detailsOfFolder.folderPath}`);
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
          <button className="new-button" onClick={handleNewFolder}>
            + New Folder
          </button>
          <button className="new-button" onClick={handleUploadFile}>
            + Upload File
          </button>
          {/* <input
            type="text"
            value={newFolder}
            onChange={(e) => setNewFolder(e.target.value)}
            placeholder="Enter new folder name"
          /> */}

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
            {!loading && user && (
              <>
                <div className="settings-icon">⚙️</div>
                <div className="profile-icon">{user[0].toUpperCase()}</div>
              </>
            )}
          </div>
        </div>
        {folderPath !== "home" && (
          <div className="back-container">
            <button className="back-button" onClick={handleBackClick}>
              Back
            </button>
          </div>
        )}
        <div className="current-folder-box">{folderPath}</div>
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
            {filteredContents.map((folderContent, index) => {
              return (
                <tr key={index}>
                  <td
                    onClick={() => {
                      folderContent.type.toLowerCase() === "folder" &&
                        handleFolderClick(folderContent);
                    }}
                  >
                    {folderContent.name}
                  </td>
                  <td>{folderContent.modifiedDate}</td>
                  <td>{folderContent.type}</td>
                  <td>{folderContent.size}</td>
                  <td>
                    <div>
                      <span
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleMenu(index);
                        }}
                      >
                        ⋮
                      </span>
                      {openMenuIndex === index && (
                        <div ref={dropdownRef} className="dropdown-menu">
                          <button
                            onClick={() =>
                              handleDownload(folderContent.fileDownloadUri)
                            }
                          >
                            Download
                          </button>
                          <button
                            onClick={() => handleDelete(folderContent.name)}
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <Modal show={showModal} onHide={CallCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isCreatingFolder ? "Create New Folder" : "Upload File"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isCreatingFolder ? (
            <Form>
              <Form.Group controlId="formFolderName">
                <Form.Label>Folder Name</Form.Label>
                <Form.Control
                  type="text"
                  value={newFolder}
                  onChange={(e) => setNewFolder(e.target.value)}
                  placeholder="Enter folder name"
                />
              </Form.Group>
            </Form>
          ) : (
            <Form>
              <Form.Group controlId="formFileName">
                <Form.Label>Upload File</Form.Label>
                <Form.Control type="file" onChange={fileChange} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={CallCloseModal}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={isCreatingFolder ? createNewFolder : callUploadFile}
          >
            {isCreatingFolder ? "Create Folder" : "Upload File"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Home;
