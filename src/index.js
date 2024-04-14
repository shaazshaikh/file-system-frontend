import React, { useState } from "react";
import ReactDOM from "react-dom/client";

function FileUploadComponent() {
  const [fileSelected, setFileSelected] = useState(null);

  const fileChange = (event) => {
    setFileSelected(event.target.files[0]);
  };

  const uploadFile = () => {
    if (fileSelected) {
      console.log("ok");
      const formData = new FormData();
      formData.append("file", fileSelected);

      fetch("https://localhost:7082/api/fileupload/uploadFiles", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          //handle response
          console.log("Response is");
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to upload");
          }
        })
        .then((data) => {
          console.log("List of URIs");
          console.log(data);
        });
    } else {
      alert("select file");
    }
  };

  return (
    <div>
      <h3>My first component - updated - 3</h3>
      <input type="file" onChange={fileChange}></input>
      <button type="button" onClick={uploadFile}>
        button
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<FileUploadComponent />);
