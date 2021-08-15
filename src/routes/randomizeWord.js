const router = require("express").Router();

router.route("/").get((req, res) => {
  res.render("index", { title: "word randomizer" });
});

router.route("/process").post((req, res) => {
  let word = req.body.word;
  const arr = word.split("");
  console.log(arr);

  res.send(word);
});
module.exports = router;
