const router = require("express").Router();
const connector = require("../connect-database");

router.route("/").get(async (req, res) => {
  const rs = await connector.run();
  console.log(rs);
  res.send(JSON.stringify(rs.rows));
});

module.exports = router;
