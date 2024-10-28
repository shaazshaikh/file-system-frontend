export const getFolderContents = async (currentFolderId) => {
  const jwtToken = localStorage.getItem("jwtToken");
  const data = await fetch(
    `https://localhost:7082/api/folderContent/getFolderContents/${currentFolderId}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  ).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Could not fetch");
    }
  });
  return data;
};

export const uploadFileInChunks = async (
  fileSelected,
  folderPath,
  currentFolderId,
  chunkSize = 1024 * 1024
) => {
  const jwtToken = localStorage.getItem("jwtToken");

  const totalNumberOfChunks = Math.ceil(fileSelected.size / chunkSize);
  const fileBlobId = crypto.randomUUID();
  const fileName = fileSelected.name;
  const fileExtension = fileName.substring(fileName.lastIndexOf("."));

  for (let index = 0; index < totalNumberOfChunks; index++) {
    const start = index * chunkSize;
    const end = Math.min(start + chunkSize, fileSelected.size);
    const chunk = fileSelected.slice(start, end);

    const formData = new FormData();
    formData.append("fileChunk", chunk);
    formData.append("folderPath", folderPath);
    formData.append("parentFolderId", currentFolderId);
    formData.append("chunkIndex", index);
    formData.append("totalNumberOfChunks", totalNumberOfChunks);
    formData.append("totalFileSize", fileSelected.size);
    formData.append("fileBlobId", fileBlobId);
    formData.append("fileName", fileName);
    formData.append("fileExtension", fileExtension);

    const data = await fetch(
      "https://localhost:7082/api/file/uploadFilesInChunks",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        body: formData,
      }
    );

    if (!data.ok) {
      throw new Error("File upload failed");
    }

    // const response = await data.json;
    // return response;
  }
  console.log("File uploaded successfully in chunks");
};

export const createFolder = async (
  currentFolderId,
  newFolderPath,
  newFolder
) => {
  const jwtToken = localStorage.getItem("jwtToken");
  const payload = {
    parentFolderId: currentFolderId,
    folderPath: newFolderPath,
    folderName: newFolder,
  };

  const response = await fetch(
    "https://localhost:7082/api/folder/createFolder",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(payload),
    }
  );
  return response;
};

export const getFolderDetails = async (currentFolder) => {
  const jwtToken = localStorage.getItem("jwtToken");
  const response = await fetch(
    `https://localhost:7082/api/folder/getFolderDetails/${currentFolder}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    throw new Error("Failed to get folder details");
  }
};
