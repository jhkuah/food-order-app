import React, { useState, useEffect } from "react";
import AdminHeader from "../components/UI/AdminHeader";
import { IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Main from "../components/Admin/Main";
import OrderSidebar from "../components/Admin/OrderSidebar";

export default function AdminPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sentOrders, setSentOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setSentOrders(storedOrders);
  }, []);

  const handleSidebarOpen = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };

  const handleOrderComplete = (orderDate) => {
    const updatedOrders = sentOrders.filter(
      (order) => order.date !== orderDate
    );
    setSentOrders(updatedOrders);

    const updatedLocalStorageOrders = JSON.parse(
      localStorage.getItem("orders")
    ).filter((order) => order.date !== orderDate);
    localStorage.setItem("orders", JSON.stringify(updatedLocalStorageOrders));
  };

  return (
    <div>
      <AdminHeader />
      <IconButton onClick={handleSidebarOpen}>
        <MenuIcon />
      </IconButton>
      <Main />
      <OrderSidebar
        open={isSidebarOpen}
        onClose={handleSidebarClose}
        orders={sentOrders}
        onOrderComplete={handleOrderComplete}
      />
    </div>
  );
}
