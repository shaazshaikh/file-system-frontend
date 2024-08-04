import React, { useState } from "react";

function FileUploadAndFetch() {
  const [fileSelected, setFileSelected] = useState(null);
  const [filesFetched, setFilesFetched] = useState([]);

  const fileChange = (event) => {
    setFileSelected(event.target.files[0]);
  };

  const getFiles = () => {
    const jwtToken = localStorage.getItem("jwtToken");
    fetch("https://localhost:7082/api/fileupload/getFiles", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Could not fetch");
        }
      })
      .then((data) => {
        setFilesFetched(data);
      });
  };

  const uploadFile = () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (fileSelected) {
      console.log("ok");
      const formData = new FormData();
      formData.append("file", fileSelected);

      fetch("https://localhost:7082/api/fileupload/uploadFiles", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
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
      {/* <FirstComponent /> */}
      <input type="file" onChange={fileChange}></input>
      <button type="button" onClick={uploadFile}>
        button
      </button>

      <div style={{ marginTop: "2%" }}>
        <button type="button" onClick={getFiles}>
          getAllFiles
        </button>
      </div>

      <ul>
        {filesFetched.map((item, index) => {
          return <li key={index}>{item}</li>;
        })}
      </ul>
    </div>
  );
}

export default FileUploadAndFetch;
