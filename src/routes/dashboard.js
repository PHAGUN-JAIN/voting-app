const router = require("express").Router();

router.route("/").get((req, res) => {
  res.send("dash api");
});

module.exports = router;
