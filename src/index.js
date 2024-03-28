import React from "react";
import ReactDOM from "react-dom/client";

function MyFirstFunction() {
  return <h2>My first component</h2>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<MyFirstFunction />);
