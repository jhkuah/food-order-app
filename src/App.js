import React, { useContext } from "react";
import Footer from "./components/UI/Footer";
import UserPage from "./pages/UserPage";
import AdminPage from "./pages/AdminPage";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import ItemsContext from "./contexts/items-context";

function App() {
  const itemsContext = useContext(ItemsContext);

  return (
    <>
      <CssBaseline />
      <Container>
        {itemsContext.isAdmin ? <AdminPage /> : <UserPage />}
      </Container>
      <Footer />
    </>
  );
}

export default App;
