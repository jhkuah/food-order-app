import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import AdminForm from "./AdminForm";
import MealsItem from "./MealsItem";

function Main() {
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3006/meals")
      .then((response) => response.json())
      .then((data) => setFoodItems(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const openAddItemForm = () => {
    setIsAddingItem(true);
  };

  const closeAddItemForm = () => {
    setIsAddingItem(false);
  };

  const handleDeleteItem = async (itemId) => {
    try {
      await fetch(`http://localhost:3006/meals/${itemId}`, {
        method: "DELETE",
      });
      setFoodItems((prevItems) =>
        prevItems.filter((item) => item.id !== itemId)
      );
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div style={{ width: "100%" }}>
      <Button
        variant="contained"
        color="primary"
        onClick={openAddItemForm}
        style={{ display: "flex", marginTop: "10px", marginLeft: "0" }}
      >
        Add Food Item
      </Button>
      {foodItems.map((meal) => (
        <MealsItem
          key={meal.id}
          id={meal.id}
          title={meal.title}
          description={meal.description}
          price={meal.price}
          image={meal.image}
          onDelete={handleDeleteItem}
        />
      ))}

      <AdminForm open={isAddingItem} onClose={closeAddItemForm} />
    </div>
  );
}

export default Main;
