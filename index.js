import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "learning_apis",
    password: "112369",
    port: 5432,
});

db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// // Database functions
// async function addTaskDB(newtitle) {
//   if (newtitle === null) {
//     console.log("Can't insert null value");
//   } else {
//     await db.query("INSERT INTO items (title) VALUES ($1)", [newtitle]);
//   }
// }

app.get("/", async(req, res) => {
    res.render("index.ejs");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});