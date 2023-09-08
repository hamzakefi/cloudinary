const mongoose = require('mongoose');

const schema = mongoose.Schema ;

const foodSchema = new schema ({
    name : {
        type : String ,
        required : true,
        unique : true
    } ,
     category: {
        type : String ,
        required : true ,
        default : ["meat" , "fish" , "vegetables"]
    } ,
    price : Number
    ,
  profile_img: String,
  cloudinary_id: String
},
{timestamps : true})

module.exports = Food = mongoose.model("food" , foodSchema)