const bcrypt = require("bcrypt");
const { User } = require("../models/users");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const allData = await User.find({});
    if (allData && allData.length) {
      res.status(200).json(allData);
    }
  } catch (e) {
    res.status(400).json({error: e});
  }
});

module.exports = router;
