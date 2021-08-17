require("dotenv").config();
const { Client } = require("cassandra-driver");

async function run() {
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

  await client.connect();

  // Execute a query
  const rs = await client.execute("SELECT * FROM test.user");
  console.log(`Your cluster returned ${rs.rowLength} row(s)`);
  console.log(rs);

  await client.shutdown();
}

// Run the async function
run();
