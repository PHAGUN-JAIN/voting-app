const router = require("express").Router();
const wordRouter = require("./randomizeWord");
const dataRouter = require("./retriveData");
const voteRouter = require("./voting");
router.route("/").get((req, res) => {
  res.send("hello routes");
});

router.use("/randomize", wordRouter);
router.use("/retrive", dataRouter);
router.use("/voting", voteRouter);
module.exports = router;
