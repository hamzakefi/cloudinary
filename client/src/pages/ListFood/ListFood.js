import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getFood } from "../../JS/Actions/food";
import CircularProgress from "@mui/material/CircularProgress";
import FoodCard from "../../components/FoodCard/FoodCard";

const ListFood = () => {
  
  const dispatch = useDispatch();
  const listFood = useSelector(
    (state) => state.foodReducer.listFood
  );
  const load = useSelector((state) => state.foodReducer.load);

  useEffect(() => {
    dispatch(getFood());
  }, [dispatch]);

  return (
    <div>
      <h1>List Food</h1>
      <div style={{display : "flex" , flexDirection : "row" ,justifyContent : "space-around" , flexWrap : "wrap" }} >
      {load ? (
        <CircularProgress
          sx={{
            color: "black",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            m: "auto",
            mb: "45%",
          }}
          size="3.5rem"
        />
      ) : (
        listFood.map((el) => <FoodCard food={el} key={el._id} />)
      )}
      </div>
    </div>
  );
};

export default ListFood;
