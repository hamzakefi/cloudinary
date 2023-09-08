const express = require('express');
const { register, login, updateUserPassword } = require('../controllers/user');
const isAuth = require('../middlewares/isAuth');
const { registerValidator, validation, loginValidator } = require('../middlewares/Validator');

const router = express.Router()


router.post("/register" ,registerValidator() , validation, register )

router.post("/login" , loginValidator(),validation ,login)


router.get("/current" ,isAuth ,(req,res)=> {
    res.send(req.user)
} )

router.put("/updatepassword/:_id" , isAuth , updateUserPassword)


module.exports = router