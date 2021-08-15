const router = require("express").Router();

router.route("/").get((req, res) => {
  res.send("profile api");
});

module.exports = router;
