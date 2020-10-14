const { User } = require("../models/users");
const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const userData = await User.findOne({email: req.body.email});
    if(userData){
        res.status(200).json({isUserAlreadyPresent: true, userData: userData});
    } else{
        res.status(200).json({isUserAlreadyPresent: false, userData: []});
    }
  } catch (e) {
    res.status(400).json({isUserAlreadyPresent:false, error: e});
  }
});

module.exports = router;
