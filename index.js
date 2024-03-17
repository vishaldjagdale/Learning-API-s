import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";
import { fileURLToPath } from "url";
import path from "path";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "learning_apis",
  password: "india@11",
  // password: "112369",
  port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, "public")));

// Serve static files from the node_modules directory
app.use("/node_modules", express.static(path.join(__dirname, "node_modules")));

app.set("view engine", "ejs"); // Set the view engine to use EJS templates

//database functions
async function verifyUsernameAndPassword(username, password) {
  var pass1 = await db.query("SELECT password FROM users WHERE username = $1", [
    username,
  ]);
  var pass1 = pass1.rows[0].password;
  console.log(pass1);

  if (pass1) {
    if (pass1 == password) {
      return true;
    } else {
      return false;
    }
  } else {
    return false; // change return logic here...
  }
}

app.get("/", async (req, res) => {
  res.render("login.ejs");
});

app.post("/login", async (req, res) => {
  //logic for login ..
  const username = req.body.username;
  const password = req.body.password;

  // verify username and  password
  const result = await verifyUsernameAndPassword(username, password);

  if (result) {
    res.redirect("/main");
  } else {
    console.log("Incorrect password");
    res.redirect("/");
  }
});

app.get("/signup", (req, res) => {
  //logic for signup ...
});

app.get("/main", (req, res) => {
  // direct to the main page from anywhere : implement
  res.render("index.ejs");
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

async function getWeather(longitude, latitude, res) {
  const apiKey = "90c525eba6dce8ed86c569dce30449d8";
  const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

  try {
    const response = await axios.get(apiUrl, {
      params: {
        lat: latitude,
        lon: longitude,
        appid: apiKey,
        units: "metric",
      },
    });

    const data = response.data;

    res.render("weather.ejs", { data });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    res.status(500).json({ error: "Failed to fetch weather data" });
  }
}

app.get("/weather", async (req, res) => {
  const latitude = 18.51;
  const longitude = 73.85;
  await getWeather(longitude, latitude, res);
});
app.post("/weather", async (req, res) => {
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  await getWeather(longitude, latitude, res);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
