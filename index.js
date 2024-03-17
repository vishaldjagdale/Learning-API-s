import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "learning_apis",
    //   password: "india@11",
    password: "112369",
    port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
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

app.get("/", async(req, res) => {
    res.render("login.ejs");
    // res.send("welcome");
});

app.post("/login", async(req, res) => {
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


app.post("/quotes", async(req, res) => {
    // code for returning api data ...

    const apiUrl = "https://zenquotes.io/api/today";

    try {
        const response = await axios.get(apiUrl);
        const data = response.data[0];
        // console.log(response.data[0]);
        res.render("quotes.ejs", {
            data: data,
        });

    } catch (error) {
        console.error("Error fetching Quotes data:", error);
        res.status(500).json({ error: "Failed to fetch Quotes data" });
    }
});

app.post("/weather", async(req, res) => {
    const latitude = 44.34;
    const longitude = 10.99;
    const apiKey = "90c525eba6dce8ed86c569dce30449d8";
    const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

    try {
        const response = await axios.get(apiUrl, {
            params: {
                lat: latitude,
                lon: longitude,
                appid: apiKey,
            },
        });

        const data = response.data;

        res.render("weather.ejs", { data });
    } catch (error) {
        console.error("Error fetching weather data:", error);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});