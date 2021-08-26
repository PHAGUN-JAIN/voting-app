require("dotenv").config();
const { Client } = require("cassandra-driver");

async function run() {
  const client = new Client({
    cloud: {
      secureConnectBundle: "./secure-connect-test-database.zip",
    },
    credentials: {
      username: "",
      password: "",
    },
  });

  await client.connect();

  // Execute a query
  let rs = await client.execute("SELECT * FROM test.user");
  // console.log(`Your cluster returned ${rs.rowLength} row(s)`);
  // console.log(rs);

  await client.shutdown();

  return rs;
}

// Run the async function
// run();

module.exports = { run };
