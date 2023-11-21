import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  IconButton,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function OrderSidebar({ open, onClose, orders, onOrderComplete }) {
  return (
    <Drawer anchor="left" open={open} onClose={onClose}>
      <div style={{ width: "450px" }}>
        <List>
          <ListItem>
            <ListItemText primary="Orders" />
          </ListItem>
          <Divider />
          {orders.map((order) => (
            <ListItem key={order.date}>
              <ListItemText
                primary={`Total Amount: $${order.totalAmount.toFixed(2)}`}
                secondary={`Date: ${new Date(order.date).toLocaleString()}`}
              />
              <ul>
                {" "}
                {order.items.map((item) => (
                  <li key={item.id}>
                    {item.title} x {item.amount}
                  </li>
                ))}
              </ul>
              <IconButton
                edge="end"
                onClick={() => onOrderComplete(order.date)}
              >
                <CheckCircleIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
}

export default OrderSidebar;
