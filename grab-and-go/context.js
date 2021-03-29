import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

// Use context hook
export function useStoreContext() {
  return useContext(StoreContext);
}

export const StoreProvider = ({ children }) => {
  const [selectedStore, setSelectedStore] = useState(null);

  return (
    <StoreContext.Provider
      value={{
        selectedStore,
        setSelectedStore
      }}
    >
          {children}
    </StoreContext.Provider>
  );
};
