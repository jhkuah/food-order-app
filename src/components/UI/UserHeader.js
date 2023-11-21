import React, { useContext, useState } from "react";
import { AppBar, Toolbar, Typography, Badge, IconButton } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartModal from "../User/CartModal";
import CartContext from "../../contexts/cart-context";
import "./Header.css";

function UserHeader() {
  const cartContext = useContext(CartContext);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCartHandler = () => {
    setIsCartOpen(true);
  };

  const closeCartHandler = () => {
    setIsCartOpen(false);
  };

  return (
    <AppBar position="static">
      <Toolbar className="toolbar">
        <div className="center">
          <Typography variant="h6" className="title">
            Food Ordering App
          </Typography>
        </div>
        <div className="cart-icon">
          <IconButton color="inherit" onClick={openCartHandler}>
            <Badge badgeContent={cartContext.items.length} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </div>
      </Toolbar>
      {isCartOpen && <CartModal onClose={closeCartHandler} />}
    </AppBar>
  );
}

export default UserHeader;
