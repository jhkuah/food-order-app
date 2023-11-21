import React, { useContext } from "react";
import { createPortal } from "react-dom";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  CardMedia,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import CartContext from "../../contexts/cart-context";
import "./CartModal.css";

function CartModal({ onClose }) {
  const cartContext = useContext(CartContext);
  const handleOrder = () => {
    cartContext.saveOrder();
    onClose();
  };

  const groupedItems = cartContext.items.reduce((grouped, item) => {
    if (!grouped[item.id]) {
      grouped[item.id] = { ...item, totalQuantity: 1, totalPrice: item.price };
    } else {
      grouped[item.id].totalQuantity++;
      grouped[item.id].totalPrice += item.price;
    }
    return grouped;
  }, {});

  const totalFinalPrice = Object.values(groupedItems).reduce(
    (total, item) => total + item.totalPrice,
    0
  );

  return createPortal(
    <Dialog open={true} onClose={onClose}>
      <DialogTitle>Your Cart</DialogTitle>
      <DialogContent>
        {cartContext.items.length === 0 ? (
          <Typography variant="body1" className="empty-cart-text">
            Your cart is empty.
          </Typography>
        ) : (
          <List className="cart-list">
            {Object.values(groupedItems).map((item) => (
              <ListItem key={item.id} className="cart-item">
                <CardMedia
                  component="img"
                  src={item.image}
                  alt={item.title}
                  className="item-image"
                />
                <ListItemText
                  primary={item.title}
                  secondary={`Qty: ${
                    item.totalQuantity
                  } $${item.totalPrice.toFixed(2)}`}
                  className="item-details"
                />
                <ListItemSecondaryAction className="secondary-action">
                  <IconButton
                    edge="end"
                    onClick={() => cartContext.removeItem(item.id)}
                  >
                    <CloseIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => cartContext.addItem(item)}
                  >
                    <AddCircleOutlineIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    onClick={() => cartContext.decreaseItemAmount(item.id)}
                  >
                    <RemoveCircleOutlineIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        <Button variant="contained" color="primary" onClick={handleOrder}>
          Order
        </Button>
      </DialogActions>
      <Typography
        variant="subtitle1"
        className="total-price"
        style={{ marginRight: "10px" }}
      >
        Total Price: ${totalFinalPrice.toFixed(2)}
      </Typography>
    </Dialog>,
    document.getElementById("portal-root")
  );
}

export default CartModal;
