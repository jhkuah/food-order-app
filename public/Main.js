import React, { useState } from "react";
import { Button } from "@mui/material";
import AdminForm from "./AdminForm"; // Adjust the import path

function Main() {
  const [isAddingItem, setIsAddingItem] = useState(false);

  const openAddItemForm = () => {
    setIsAddingItem(true);
  };

  const closeAddItemForm = () => {
    setIsAddingItem(false);
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={openAddItemForm}>
        Add Food Item
      </Button>
      {/* ... (other content) */}
      <AdminForm open={isAddingItem} onClose={closeAddItemForm} />
    </div>
  );
}

export default Main;
