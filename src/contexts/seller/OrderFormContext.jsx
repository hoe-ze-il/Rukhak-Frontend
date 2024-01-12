import { useState, createContext } from "react";

const OrderFormContext = createContext();

function OrderFormContextProvider({ children }) {
  const [file, setFile] = useState("");
  const [files, setFiles] = useState([]);
  const [description, setDescription] = useState("");

  return (
    <OrderFormContext.Provider
      value={{ file, setFile, files, setFiles, description, setDescription }}
    >
      {children}
    </OrderFormContext.Provider>
  );
}

export { OrderFormContextProvider, OrderFormContext };
