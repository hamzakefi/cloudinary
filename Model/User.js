const mongoose = require('mongoose');

const {Schema , model} = mongoose ;

const UserSchema = new Schema ({
    firstname : {
        type : String,
        required : true,
    } ,
    name : {
        type : String,
        required : true,
    } ,
    email : {
        type : String,
        required : true,
    } ,
    password : {
        required : true,
        type : String,  
    } ,
    isAdmin : {
        type : Boolean,
        default : false
    }
})

module.exports = User = model ("user" , UserSchema);