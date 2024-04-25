const express = require("express");
const Feedback = require("../models/feedback.model.js");
const Users = require("../models/user.model.js");
const { tokenAuth } = require("../middlewares/tokenAuth.js");
const router=express.Router();

router.use(express.json())

router.post('/submit', tokenAuth , async (req, res) => {
    const {user} = req;
    const {data : { name, email, message }} = req.body;

    try {
    const existingUser = await Users.findById(user._id);

    if (!existingUser) {
        return res.status(400).json({ message: 'Email does not exist. Please sign up first.' });
    }
    const newFeedback = await Feedback.create({
        name,
        email,
        message
    });
    console.log({newFeedback})

    existingUser.feedback.push(newFeedback._id)

    await newFeedback.save();
    await existingUser.save()
    res.status(200).json({ success:true , message: 'Thanks for your feedback!' , feedback : newFeedback});
    } catch (err) {
    console.error(err);
    res.status(500).json({ success:false , message : err.message });
    }
});
    
module.exports = router