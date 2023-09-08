import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import {deleteFood } from "../../JS/Actions/food";

const FoodCard = ({food}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const isAdmin = useSelector(state => state.userReducer.isAdmin )
  return (
    <div>
      <Card sx={{ maxWidth: 400 ,width : 300  ,mb:"6%"  }}>
        <CardMedia
          sx={{ height: 140 }}
          image={food.profile_img}
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {food.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Category :{food.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
          Price :{food.price} $
        </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" variant="contained" color="success" onClick={()=> navigate(`/EditContact/${food._id}`)} >Edit</Button>
          {isAdmin === true ? 
            <Button size="small" color="error" variant="contained" onClick={()=>dispatch(deleteFood(food._id))} >Delete <DeleteOutlineIcon sx={{color : "white"}}/> </Button> :
            null
          }
          
        </CardActions>
      </Card>
    </div>
  );
};

export default FoodCard;
