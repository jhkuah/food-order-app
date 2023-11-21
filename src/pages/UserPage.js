import React, { useEffect, useState } from "react";
import UserHeader from "../components/UI/UserHeader";
import MealsItem from "../components/User/MealsItem";
export default function UserPage() {
  const [availableMeals, setAvailableMeals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3006/meals")
      .then((response) => response.json())
      .then((data) => setAvailableMeals(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      <UserHeader />
      {availableMeals.map((meal) => (
        <MealsItem
          key={meal.id}
          id={meal.id}
          title={meal.title}
          description={meal.description}
          price={meal.price}
          image={meal.image}
        />
      ))}
    </div>
  );
}
