const { User } = require("../models/users");
const express = require("express");
const router = express.Router();

router.put("/", (req, res) => {
  User.findOneAndUpdate(
    { email: req.body.email },
    { $set: { isAvailable: req.body.isAvailable,lastUpdated:new Date() } },
    { new: true },
    (err, items) => {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json({ success: true });
      }
    }
  );
});

module.exports = router;
