import React, { useContext } from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import CartContext from "../../contexts/cart-context";
import "./MealsItem.css";

function MealsItem({ id, title, description, image, price }) {
  const cartContext = useContext(CartContext);

  const addToCartHandler = () => {
    const newItem = {
      id: id,
      title: title,
      description: description,
      image: image,
      price: price,
      amount: 1,
    };

    cartContext.addItem(newItem);
  };

  return (
    <Card className="meals-item">
      <CardActionArea>
        <CardMedia component="img" height="140" image={image} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Price: RM{price.toFixed(2)}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={addToCartHandler}>
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default MealsItem;
