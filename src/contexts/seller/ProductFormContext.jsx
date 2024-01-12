import { useState, createContext } from "react";

const ProductFormContext = createContext();

function ProductFormContextProvider({ children }) {
  const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");

  return (
    <ProductFormContext.Provider
      value={{ file, setFile, files, setFiles, description, setDescription }}
    >
      {children}
    </ProductFormContext.Provider>
  );
}

export { ProductFormContextProvider, ProductFormContext };
