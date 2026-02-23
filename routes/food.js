const express = require('express');
const Food = require("../Model/Food")
const cloudinary = require("../middlewares/cloudinary");
const upload = require("../middlewares/multer");
const isAuth = require('../middlewares/isAuth');
const isAdmin = require('../middlewares/isAdmin');
const router = express.Router()

// router.get('/test' , (req,res) =>{
//     res.send("api is running")
// })

router.post("/add-food" ,[isAuth],upload.single("image"), async(req,res) =>{
    try {
        const result = await cloudinary.uploader.upload(req.file.path);
        
        let newFood = new Food({
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            profile_img: result.secure_url,
            cloudinary_id: result.public_id,
          });
        await newFood.save()
        res.status(200).send({msg : "food added successfully" , newFood})
    } catch (error) {
        res.status(400).send({ msg : "can not add this contact" , error})
    }
})

router.get("/allfood" , async(req,res) => {
    try {
        const listFood = await Food.find()
        res.status(200).send({msg : "list food" , listFood})

    } catch (error) {
        res.status(400).send({msg : "can not get list" , error})
    }
})

router.delete("/:_id", [isAuth, isAdmin], async (req, res) => {
    try {
        let food = await Food.findById(req.params._id);
        if (!food) {
            return res.status(404).send({ msg: "food not found" })
        }
        if (food.cloudinary_id) {
            await cloudinary.uploader.destroy(food.cloudinary_id);
        }
        await food.deleteOne();
        res.status(200).send({ msg: "food deleted" })
    } catch (error) {
        res.status(400).send({ msg: "can not delete ", error })
    }
})

router.put("/:_id", [isAuth, isAdmin], upload.single("image"), async (req, res) => {
    try {
        let food = await Food.findById(req.params._id);
        if (!food) {
            return res.status(404).send({ msg: "food not found" })
        }

        let result;
        if (req.file) {
            // If there's a new image, delete the old one first
            if (food.cloudinary_id) {
                await cloudinary.uploader.destroy(food.cloudinary_id);
            }
            // Upload new image
            result = await cloudinary.uploader.upload(req.file.path);
        }

        const data = {
            name: req.body.name || food.name,
            category: req.body.category || food.category,
            price: req.body.price || food.price,
            profile_img: result ? result.secure_url : food.profile_img,
            cloudinary_id: result ? result.public_id : food.cloudinary_id,
        };

        const updatedFood = await Food.findByIdAndUpdate(req.params._id, data, {
            new: true
        });
        res.status(200).send({ msg: "food updated", updatedFood })
    } catch (error) {
        res.status(400).send({ msg: "can not update", error })
    }
})

router.get("/:_id" , async (req,res) => {
    try {
        const foodToGet = await Food.findOne({_id : req.params._id})
        res.status(200).send({msg : 'food getted',foodToGet})
    } catch (error) {
        res.status(400).send({msg : "can not get this food" , error})

    }
})


module.exports = router