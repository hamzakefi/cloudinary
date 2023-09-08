// importation 

import { FAIL_FOOD, GET_FOOD, GET_ONE_FOOD, LOAD_FOOD } from "../ActionTypes/food"


//initialeState
const initialState = {
    listFood : [] ,
    foodToGet : {} ,
    load : false ,
    errors : null,
}




// pure functions


const foodReducer = (state = initialState , {type , payload} ) => {
    switch (type) {
             case LOAD_FOOD : 
                return  {...state , load : true} 
            case  GET_FOOD :
                return {...state , load : false , listFood : payload.listFood }  
            case GET_ONE_FOOD :
                return {...state , load : false ,foodToGet : payload.foodToGet }
            case FAIL_FOOD :
                return {...state , load : false , errors : payload}
            default : 
                return state;
    }
}


export default foodReducer 