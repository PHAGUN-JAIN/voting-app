require("dotenv").config();
const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

const routes = require("./routes");

app.set("views", "./views");
app.set("view engine", "ejs");

// app.get("/", (req, res) => {
//   res.render("index", { title: "word randomizer" });
// });
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Listening to port ${PORT}`);
});
