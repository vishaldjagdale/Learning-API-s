import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "permalist",
    // password: "india@11",
    password: "112369",
    port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

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
app.post("/quotes", (req, res) => {
    // code for returning api data ...
});
app.post("/weather", (req, res) => {
    // code for returning api data ...
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});