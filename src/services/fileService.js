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

export const uploadFile = async (fileSelected, folderPath, currentFolderId) => {
  const jwtToken = localStorage.getItem("jwtToken");
  const formData = new FormData();
  formData.append("file", fileSelected);
  formData.append("folderPath", folderPath);
  formData.append("parentFolderId", currentFolderId);

  const data = await fetch("https://localhost:7082/api/file/uploadFiles", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
    body: formData,
  });

  if (!data.ok) {
    throw new Error("File upload failed");
  }

  const response = await data.json;
  return response;
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
