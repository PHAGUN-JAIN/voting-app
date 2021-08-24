const router = require("express").Router();
require("dotenv").config();
const { Client } = require("cassandra-driver");

const client = new Client({
  cloud: {
    secureConnectBundle: "./secure-connect-test-database.zip",
  },
  credentials: {
    username: "XOPLEXSZBsLcimyWlwDeKAqg",
    password:
      "8ZxuqYkS8oPoHaMREKOaWQAHwppIXvDz9WP6q+hNpYSr-377p-fYnreXR-RRH-d50TL8iKnXAG28LYy14LSx4CuIl6JEuQlCI-btmgt2I,0JBb9nEZsqHUzTce,urjzn",
  },
});

router.route("/").get((req, res) => {
  res.render("landingPage");
  res.end();
});
router.route("/castvote").post((req, res) => {
  res.write(req.body.name);
  res.end();
});
router.route("/retrive").get(async (req, res) => {
  await client.connect();

  let rs = await client.execute("SELECT * FROM test.voting;");

  res.send(rs);

  await client.shutdown();
});

module.exports = router;
