const router = require("express").Router();
const profileRouter = require("./profile");
const dashRouter = require("./dashboard");
const wordRouter = require("./randomizeWord");

router.route("/").get((req, res) => {
  res.send("hello routes");
});

router.use("/profile", profileRouter);
router.use("/dashboard", dashRouter);
router.use("/randomize", wordRouter);
module.exports = router;
