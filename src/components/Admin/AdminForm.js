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
import "./AdminForm.css";

function AdminForm({ open, onClose }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (event) => {
    setImageFile(event.target.files[0]);
  };

  const submitFormHandler = async () => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append("image", imageFile);
      const response = await fetch(
        "https://api.imgbb.com/1/upload?key=45e9e691526a30d0c726a215409b19d2",
        {
          method: "POST",
          body: formData,
        }
      );
      const imageData = await response.json();
      console.log(imageData);
      const imageUrl = imageData.data.image.url;

      const newItem = {
        id: Date.now().toString(),
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
      onClose();
      window.location.reload();
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
          <FormControl style={{ marginTop: "20px", marginBottom: "20px" }}>
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
              style={{ marginTop: "50px" }}
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </FormControl>
          <Button
            style={{ marginTop: "10px" }}
            variant="contained"
            color="primary"
            onClick={submitFormHandler}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit"}
          </Button>
          <Button
            style={{ marginTop: "10px" }}
            variant="outlined"
            color="secondary"
            onClick={onClose}
          >
            Close
          </Button>
        </div>
      </Fade>
    </Modal>
  );
}

export default AdminForm;
