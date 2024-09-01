export const getFiles = async () => {
  const jwtToken = localStorage.getItem("jwtToken");
  const data = await fetch("https://localhost:7082/api/fileupload/getFiles", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  }).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Could not fetch");
    }
  });
  return data;
};

export const uploadFile = async (fileSelected, folderPath) => {
  const jwtToken = localStorage.getItem("jwtToken");
  if (fileSelected) {
    const formData = new FormData();
    formData.append("file", fileSelected);
    formData.append("folder", folderPath);

    const data = await fetch(
      "https://localhost:7082/api/fileupload/uploadFiles",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
        body: formData,
      }
    ).then((response) => {
      //handle response
      console.log("Response is");
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Failed to upload");
      }
    });
    return data;
  }
  return null;
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
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(payload),
    }
  ).then((response) => {
    return response;
  });
};

export const getFolderDetails = async (home) => {
  const jwtToken = localStorage.getItem("jwtToken");
  const response = await fetch(
    `https://localhost:7082/api/folder/getFolderDetails/${home}`,
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
