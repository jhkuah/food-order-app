import React, { createContext, useState, useEffect } from "react";

const ItemsContext = createContext();

export const ItemsProvider = ({ children }) => {
  const storedIsAdmin = localStorage.getItem("isAdmin");
  const initialIsAdmin =
    storedIsAdmin !== null ? JSON.parse(storedIsAdmin) : false;
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(initialIsAdmin);

  useEffect(() => {
    const savedIsAdmin = localStorage.getItem("isAdmin");
    if (savedIsAdmin) {
      setIsAdmin(JSON.parse(savedIsAdmin));
    }
  }, []);

  const selectItem = (itemId) => {
    setSelectedItemId(itemId);
  };

  const toggleUserAdmin = () => {
    setIsAdmin((prevState) => !prevState);
  };

  useEffect(() => {
    localStorage.setItem("isAdmin", JSON.stringify(isAdmin));
  }, [isAdmin]);

  const itemsContext = {
    selectedItemId: selectedItemId,
    selectItem: selectItem,
    isAdmin: isAdmin,
    toggleUserAdmin: toggleUserAdmin,
  };

  return (
    <ItemsContext.Provider value={itemsContext}>
      {children}
    </ItemsContext.Provider>
  );
};

export default ItemsContext;
