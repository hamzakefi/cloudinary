import axios from "axios";
import { ADD_FOOD, FAIL_FOOD, GET_FOOD, GET_ONE_FOOD, LOAD_FOOD } from "../ActionTypes/food";


export const getFood = () => async (dispatch) => {
    dispatch({type : LOAD_FOOD})
    try {
        let result = await axios.get("/api/food/allfood")
        dispatch({type : GET_FOOD , payload : result.data })
    } catch (error) {
        dispatch({type : FAIL_FOOD , payload : error.response})
    }
}

export const addFood = (newFood,navigate) => async (dispatch) => {
    dispatch({type : LOAD_FOOD})
    try {
        const config = {
            headers : {
                authorization : localStorage.getItem("token")
            } ,
            isAdmin : true
        }
        let result = await axios.post("/api/food/add-food" , newFood ,config )
        dispatch({type : ADD_FOOD , payload : result.data})
        dispatch (getFood())
        navigate('/listfood')
    } catch (error) {
        dispatch({type : FAIL_FOOD , payload : error.response})
    }
}

export const deleteFood = (id) => async (dispatch) => {
    dispatch({type : LOAD_FOOD})
    try {
        await axios.delete(`/api/food/${id}`)
        dispatch (getFood()) 
    } catch (error) {
        dispatch({type : FAIL_FOOD , payload : error.response})
    }
}

export const editFood = (id,newFood) => async (dispatch) => {
    dispatch({type : LOAD_FOOD})
    try {
        await axios.put(`/api/food/${id}` , newFood)
        dispatch (getFood()) 
    } catch (error) {
        dispatch({type : FAIL_FOOD , payload : error.response})
    }
}

export const getOneFood = (id) => async(dispatch) => {
    dispatch({type : LOAD_FOOD})
    try {
        let result = await axios.get(`/api/food/${id}`)
        dispatch({type : GET_ONE_FOOD , payload : result.data})
    } catch (error) {
        dispatch({type : FAIL_FOOD , payload : error.response})  
    }
}