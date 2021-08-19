require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require("./routes");

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
