import { createContext, useState, useContext } from "react";

// Create the context
const AreaContext = createContext();

// Provider component
export const AreaProvider = ({ children }) => {
  const [selectedArea, setSelectedArea] = useState("All Areas");

  return (
    <AreaContext.Provider value={{ selectedArea, setSelectedArea }}>
      {children}
    </AreaContext.Provider>
  );
};

// Custom hook to access the context
export const useArea = () => {
  return useContext(AreaContext);
};
