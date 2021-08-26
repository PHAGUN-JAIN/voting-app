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

router.route("/castvote").post(async (req, res) => {
  await client.connect();

  let sap = req.body.sap;

  const query = "SELECT * FROM test.voting WHERE sap=?";

  let rs = await client
    .execute(query, [sap], {
      prepare: true,
    })
    .catch((error) => {
      console.log("Cant operate ", error);
      res.status(500).json({ error: "Cant add record: " });
    });

  if (rs.rowLength === 0) {
    res.send("YOU MY FREN IS NOT REGISTERED, KINDLY CONTACT THE DEVELOPIER");
  } else {
    if (rs.rows[0].status === "v") {
      res.send("You have already voted");
      res.end();
    }
    if (rs.rows[0].status === "n") {
      await client.execute(
        "UPDATE test.voting SET status='v' WHERE sap=?",
        [sap],
        {
          prepare: true,
        }
      );

      let candidates_votes = await client
        .execute(
          "SELECT vote from test.candidates WHERE sap=?",
          [req.body.candidateid],
          { prepare: true }
        )
        .catch((error) => {
          console.log("Cant operate ", error);
          res.status(500).json({ error: "Cant fetch " });
        });

      console.log(candidates_votes);

      let update_vote = candidates_votes.rows[0].vote + 1;

      await client
        .execute(
          "UPDATE test.candidates SET vote=? WHERE sap=?",
          [update_vote, req.body.candidateid],
          { prepare: true }
        )
        .catch((error) => {
          console.log("Cant operate ", error);
          res.status(500).json({ error: "Cant update " });
        });

      res.send("your vote has been recorded! CHEERS!!!");
      res.end();
    }
  }

  res.end();
});

router.route("/arena").get(async (req, res) => {
  await client.connect();

  const rs = await client.execute("SELECT * FROM test.candidates;");
  console.log(rs.rows);

  res.render("votingarena", {
    vote1: rs.rows[0].vote,
    id1: rs.rows[0].id,
    name1: rs.rows[0].name,
    vote2: rs.rows[1].vote,
    id2: rs.rows[1].id,
    name2: rs.rows[1].name,
  });
  res.end();
});

router.route("/retrive").get(async (req, res) => {
  await client.connect();

  let rs = await client.execute("SELECT * FROM test.voting;");

  res.send(rs.rows);

  // await client.shutdown();
});

module.exports = router;
