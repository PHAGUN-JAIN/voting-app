const random = require("../utility/randomizeFunction.js");
const router = require("express").Router();

router.route("/").get((req, res) => {
  res.render("randomWord", { title: "word randomizer" });
});

router.route("/").post((req, res) => {
  let word = req.body.word;

  res.send(random.randomize(word));
});

module.exports = router;