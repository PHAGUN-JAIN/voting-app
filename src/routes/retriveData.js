const router = require("express").Router();
const connector = require("../connect-database");
require("dotenv").config();
const { Client } = require("cassandra-driver");

const client = new Client({
  cloud: {
    secureConnectBundle: "./secure-connect-test-database.zip",
  },
  credentials: {
    username: "",
    password:
      "",
  },
});

router.route("/").get(async (req, res) => {
  const rs = await connector.run();
  // console.log(rs);
  // res.status(200).write(JSON.stringify(rs.rows));
  for (var i = 0; i < rs.rowLength; i++) {
    res.status(200).write(JSON.stringify(rs.rows[i]));
  }

  res.end();
});

router.route("/postdata").get((req, res) => {
  res.render("database");
});

router.route("/").post(async (req, res) => {
  // console.log(typeof req.body.usr_id);
  // console.log(typeof req.body.age);
  // console.log(typeof req.body.usr_name);

  // console.log(typeof req.query.usr_id);
  // console.log(req);
  // let usr_id = req.body.usr_id;
  // let age = req.body.age;
  // let usr_name = req.body.usr_name;
  await client.connect();

  await client
    .execute(
      "INSERT INTO test.user (usr_id, age, name)VALUES(?,?,?)",
      [req.body.usr_id, req.body.age, req.body.usr_name],
      { prepare: true }
    )
    .then((result) => {
      res.send(result);
      // res.json({ result });
    })
    .catch((error) => {
      console.log("Cant add record: ", error);
      res.status(500).json({ error: "Cant add record: " });
    });

  await client.shutdown();
});

module.exports = router;
