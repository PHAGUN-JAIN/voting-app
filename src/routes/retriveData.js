const router = require("express").Router();
const connector = require("../connect-database");
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

router.route("/").get(async (req, res) => {
  const rs = await connector.run();
  console.log(rs);
  // res.status(200).write(JSON.stringify(rs.rows));
  for (var i = 0; i < rs.rowLength; i++) {
    res.status(200).write(JSON.stringify(rs.rows[i]));
  }

  res.end();
});

router.route("/").post(async (req, res) => {
  console.log(`data adding ${req.params.usr_id}`);
  await client.connect();
  await client
    .execute(
      "INSERT INTO test.user" + "(usr_id, age, name)VALUES(?,?,?)",
      [req.params.usr_id, req.params.age, req.params.usr_name],
      { prepare: true }
    )
    .then((result) => {
      res.json({ usr_id, age, usr_name });
    })
    .catch((error) => {
      console.log("Cant add record: ", error);
      res.status(500).json({ error: "Cant add record: " });
    });
  await client.shutdown();
});

module.exports = router;
