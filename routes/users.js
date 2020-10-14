const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  console.log('I am inside')
  if (user) {
    return res.status(400).send("User already exists");
  } else {
    
    // INSERT into db
    user = new User({
      email: req.body.email,
      name: req.body.name,
      expertise:req.body.expertise,
      isAvailable:req.body.isAvailable,
      lastUpdated: new Date()
    });
    await user.save();
    res.status(200).send({success: true});
  }
});

module.exports = router;
