import { useState, createContext } from "react";

const NewProductContext = createContext();

function NewProductProvider({ children }) {
  const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");

  return (
    <NewProductContext.Provider
      value={{ file, setFile, files, setFiles, description, setDescription }}
    >
      {children}
    </NewProductContext.Provider>
  );
}

export { NewProductProvider, NewProductContext };
