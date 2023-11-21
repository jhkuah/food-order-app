import React, { useContext } from "react";
import { Button } from "@mui/material";
import ItemsContext from "../../contexts/items-context";
import "./Footer.css";

function Footer() {
  const itemsContext = useContext(ItemsContext);

  return (
    <footer className="footer">
      <Button
        variant="contained"
        color="primary"
        onClick={itemsContext.toggleUserAdmin}
      >
        Switch to {itemsContext.isAdmin ? "User" : "Admin"} Page
      </Button>
    </footer>
  );
}

export default Footer;
