import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "learning_apis",
  password: "india@11",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  res.render("login.ejs");
});

app.post("/login", (req, res) => {
  //logic for login ..
});

app.get("/signup", (req, res) => {
  //logic for signup ...
});

app.get("/main", (req, res) => {
  // direct to the main page from anywhere : implement
});

app.post("/cat", (req, res) => {
  // code for returning api data ...
});
app.post("/images", (req, res) => {
  // code for returning api data ...
});
app.post("/quotes", (req, res) => {
  // code for returning api data ...
});
app.post("/weather", (req, res) => {
  // code for returning api data ...
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
