import { Button, CircularProgress, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { addFood } from '../../JS/Actions/food';
import {Helmet} from "react-helmet";


const AddFood = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const load = useSelector((state) => state.foodReducer.load);

  const [food , setFood] = useState({})
  const [file,setFile] = useState(null)

  const handleChange = (e) => {
    setFood({...food , [e.target.name] : e.target.value })
  }

    const handlePhoto = (e) => {
      setFile(e.target.files[0])
    }

    const handleAdd = (e) => {
      e.preventDefault();
      let data = new FormData()
      data.append("name" , food.name );
      data.append("price",food.price)
      data.append("category",food.category)
      data.append("image",file)
      dispatch(addFood(data,navigate))
    }


  return (
    <div>
      <Helmet>
          <meta charSet="utf-8" />
          <title>Add Food</title>
          <link rel="canonical" />
          <meta
          name="description"
          content="add contact"
        />
      </Helmet>
    <h1>Add food</h1>

    <TextField id="standard-basic" label="Name" variant="standard"  onChange={handleChange} type="text" name="name" />
      <br/>
      <br/>
    <TextField id="standard-basic" label="category" variant="standard"  onChange={handleChange} type="text" name ="category" />
      <br/>
      <br/>
    <TextField id="standard-basic" label="price" variant="standard"  onChange={handleChange} type="number" name = "price"/>
      <br/>
      <input type="file" id="file-input" encType="multipart/form-data" onChange={handlePhoto} />

    <br/>
      {load ? 
        <Button variant="contained" color="success" onClick={handleAdd} >
        <CircularProgress size="1.25rem" sx={{ color: "white" }} />
        ADD Food
        </Button> 
        :

        <Button variant="contained" color="success" onClick={handleAdd} >
        ADD Food
        </Button>
      }
    </div>
  )
}

export default AddFood
