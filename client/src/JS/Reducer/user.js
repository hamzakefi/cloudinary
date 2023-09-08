import { CLEAR_ERRORSUSER, CLEAR_SUCCESSUSER, CURRENT_USER, EDIT_USERPASSWORD, FAIL_USER, LOAD_USER, LOGIN_USER, LOGOUT_USER, REGISTER_USER } from "../ActionTypes/user"



const initialeState = {
    user : null ,
    loadUser : false ,
    isAuth : false ,
    newUser : {} ,
    errors : null ,
    success : null ,
    isAdmin : false ,
}

const userReducer = (state = initialeState , {type , payload}) => {
    switch (type) {
        case LOAD_USER :
            return {...state , loadUser : true}
        case REGISTER_USER :
            localStorage.setItem("token" , payload.token)
            return {...state , loadUser : false , newUser : {...payload.newUser , password : null} , success : payload.success , isAuth  : true}
        case LOGIN_USER :
            localStorage.setItem("token" , payload.token)
            return {...state , loadUser : false , user :{...payload.user , password : null} , isAuth : true ,success : payload.success ,isAdmin : payload.isAdmin } 
        case CURRENT_USER :
            return {...state , user : {...payload , password : null} , isAuth : true , loadUser : false , isAdmin : payload.isAdmin }
        case EDIT_USERPASSWORD :
            return {...state , isAuth : true , loadUser : false , user : payload.updatedUserPassword ,success : payload.success }
        case LOGOUT_USER:
            localStorage.removeItem("token")
            return { 
                    user : null ,
                    loadUser : false ,
                    isAuth : false ,
                    newUser : {} ,
                    errors : null ,
                    success : null ,
                    isAdmin : false
                } 
        case FAIL_USER: 
            return {...state , loadUser : false , errors : payload}   
        case CLEAR_ERRORSUSER :
            return {...state , errors : null }   
        case CLEAR_SUCCESSUSER : 
            return { ...state , success : null}  
        default : 
            return state;
    }
}

export default userReducer