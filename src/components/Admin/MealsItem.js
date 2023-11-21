import React from "react";
import {
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
} from "@mui/material";
import "./MealsItem.css";

function MealsItem({ id, title, description, price, image, onDelete }) {
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
        <Button size="small" color="secondary" onClick={() => onDelete(id)}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
}

export default MealsItem;
