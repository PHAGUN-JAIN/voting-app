const router = require("express").Router();
const connector = require("../connect-database");

router.route("/").get((req, res) => {
  const rs = connector.run();
  console.log(rs);
  res.send(JSON.stringify(rs));
});

module.exports = router;
