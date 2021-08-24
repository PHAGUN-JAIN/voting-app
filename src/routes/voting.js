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

  // await client.shutdown();

  // if (rs.rows === null) {
  //   res.send("YOU MY FREN IS NOT ALLOWED TO VOTE! BISSHHHH");
  // } else {
  //   if (rs.rows[0].status === "v") {
  //     res.send("You have Already Voted");
  //   } else if (rs.rows[0].status === "n") {
  //     res.send("YOU CAN VOTE");
  //   }
  // }

  if (rs.rowLength === 0) {
    res.send("YOU MY FREN IS NOT ALLOWED TO VOTE! BISSHHHH");
  } else {
    if (rs.rows[0].status === "v") {
      res.send("You have Already Voted");
    }

    if (rs.rows[0].status === "n") {
      await client.execute("UPDATE voting set status='v' where sap=?", [sap], {
        prepare: true,
      });
      res.send("Your vote has been recorded");
    }
  }

  // if (rs.rows[0].status === "v") {
  //   res.send("You have Already Voted");
  // }

  // if (rs.rows[0].status === "n") {
  //   res.send("YOU CAN VOTE");
  // }

  // res.send(rs.rows[0].status);
  res.end();
});

router.route("/retrive").get(async (req, res) => {
  await client.connect();

  let rs = await client.execute("SELECT * FROM test.voting;");

  res.send(rs.rows);

  // await client.shutdown();
});

module.exports = router;
