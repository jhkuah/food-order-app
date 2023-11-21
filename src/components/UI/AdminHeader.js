import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import "./Header.css";

function AdminHeader() {
  return (
    <AppBar position="static">
      <Toolbar className="toolbar">
        <div className="center">
          <Typography variant="h6" className="title">
            Food Ordering App
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default AdminHeader;
