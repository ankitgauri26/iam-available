const { User } = require("../models/users");
const express = require("express");
const router = express.Router();

router.post("/", (req, res) => {
  User.findOneAndDelete(
    { email: req.body.email },
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
