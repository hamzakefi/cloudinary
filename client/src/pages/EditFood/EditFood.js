import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";
import { editFood, getOneFood } from "../../JS/Actions/food";
import { Button, CircularProgress, TextField } from "@mui/material";

const EditFood = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const match = useMatch("/EditFood/:id");
  const [newFood, setNewFood] = useState({});

  const [file, setFile] = useState(null);

  const foodToGet = useSelector(
    (state) => state.foodReducer.foodToGet
  );
  const load = useSelector((state) => state.foodReducer.load);

  const handleChange = (e) => {
    setNewFood({ ...newFood, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    dispatch(getOneFood(match.params.id));
  }, []);

  const handlePhoto = (e) => {
    setFile(e.target.files[0]);
  };

  const handleEdit = (e) => {
    e.preventDefault();
    let data = new FormData();
    if (newFood.name) data.append("name", newFood.name);
    if (newFood.price) data.append("price", newFood.price);
    if (newFood.category) data.append("category", newFood.category);
    if (file) data.append("image", file);

    dispatch(editFood(match.params.id, data, navigate));
  };

  return (
    <div>
      <h1>Edit food</h1>

      <TextField id="standard-basic" type="text" label={`${foodToGet.name}`} variant="standard" onChange={handleChange} name="name" />
      <br /><br />
      <TextField id="standard-basic" type="text" label={`${foodToGet.category}`} variant="standard" onChange={handleChange} name="category" />
      <br /><br />
      <TextField id="standard-basic" type="number" label={`${foodToGet.price}`} variant="standard" onChange={handleChange} name="price" />
      <br /><br />
      <input type="file" id="file-input" encType="multipart/form-data" onChange={handlePhoto} />
      <br /><br />
      {
        load ?
          <Button variant="contained" color="success" onClick={handleEdit} >
            Edit <CircularProgress size="1.25rem" sx={{ color: "white" }} />
          </Button> :
          <Button variant="contained" color="success" onClick={handleEdit} >
            Edit
          </Button>
      }

    </div>
  );
};

export default EditFood;
