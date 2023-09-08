const {check , validationResult} = require("express-validator")


exports.registerValidator = () => [
    check("firstname" , "Veuillez insérer votre prénom !").not().isEmpty() ,
    check("name" , "Veuillez insérer votre nom !").not().isEmpty() ,
    check("email" , "Veuillez insérer un email valide !").isEmail() ,
    check("password" , "Veuillez insérer votre password!").isLength({min : 6})
]


exports.loginValidator = () => [
    check("email" , "Veuillez insérer une email valide!").isEmail() ,
    check("password" , "Veuillez insérer votre password!").isLength({min : 6})   
]


exports.validation = (req,res,next) => {
  const errors = validationResult(req) 
  if (!errors.isEmpty()){
    return res.status(400).json({errors : errors.array()})
  } 
  next()
}