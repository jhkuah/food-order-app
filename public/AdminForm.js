import React, { useState } from "react";
import {
  Button,
  Modal,
  FormControl,
  InputLabel,
  Input,
  Backdrop,
  Fade,
} from "@mui/material";

function AdminForm({ open, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null); // To store the selected image file
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const submitFormHandler = async () => {
    try {
      setIsLoading(true);

      // Step 1: Upload image to Freeimage.host API
      const formData = new FormData();
      formData.append("image", imageFile);
      const response = await fetch(
        "https://freeimage.host/api/1/upload/?key=6d207e02198a847aa98d0a2a901485a5",
        {
          method: "POST",
          body: formData,
        }
      );
      const imageData = await response.json();
      const imageUrl = imageData.image.url;

      // Step 2: Upload data to your local JSON server
      const newItem = {
        id: Date.now().toString(), // Generate a unique ID
        title: name,
        description: description,
        price: parseFloat(price),
        image: imageUrl,
      };

      await fetch("http://localhost:3006/meals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      setIsLoading(false);
      onClose(); // Close the form after submitting
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className="modal-container">
          <h2 id="modal-title">Add Food Item</h2>
          <FormControl>
            <InputLabel htmlFor="name">Name</InputLabel>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="price">Price</InputLabel>
            <Input
              id="price"
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="image">Image</InputLabel>
            <Input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={submitFormHandler}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
          <Button variant="outlined" color="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </Fade>
    </Modal>
  );
}

export default AdminForm;
