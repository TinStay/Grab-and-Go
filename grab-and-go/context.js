import React, { createContext, useContext, useState } from "react";

const StoreContext = createContext();

// Use context hook
export function useStoreContext() {
  return useContext(StoreContext);
}

export const StoreProvider = ({ children }) => {
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(null);
  const [shoppingCart, setShoppingCart] = useState({
    items: [],
    totalPrice: 0
  });

  const state = {
    stores,
    setStores,
    selectedStore,
    setSelectedStore,
    shoppingCart,
    setShoppingCart,
  }

  return (
    <StoreContext.Provider
      value={state}
    >
          {children}
    </StoreContext.Provider>
  );
};
