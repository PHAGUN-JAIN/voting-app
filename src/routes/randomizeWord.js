const { randomize } = require("../utility/randomizeFunction");

const router = require("express").Router();
require("../utility/randomizeFunction");
router.route("/").get((req, res) => {
  res.render("index", { title: "word randomizer" });
});

router.route("/").post((req, res) => {
  let word = req.body.word;
  randomize(word);

  res.send(word);
});
module.exports = router;
