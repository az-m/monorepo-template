import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import pg from "pg";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.listen(8080, function () {
  console.log("Server is alive and listening on 8080");
});

app.get("/", function (request, response) {
  response.json({ message: "This is the root route of the API." });
});

const db = new pg.Pool({
  connectionString: process.env.DB_URL,
});

app.get("/squad", async (request, response) => {
  const query = await db.query(`SELECT * FROM squad`);
  response.json(query.rows);
});

app.get("/goalkeepers", async (request, response) => {
  const query = await db.query(
    `SELECT * FROM squad WHERE position = 'goalkeeper'`
  );
  response.json(query.rows);
});

app.post("/addPlayer", (request, response) => {
  const body = request.body;
  const query = db.query(
    `INSERT INTO squad (player_name, position, nationality, dob, squad_number) VALUES($1,$2,$3,$4,$5)`,
    [
      body.player_name,
      body.position,
      body.nationality,
      body.dob,
      body.squad_number,
    ]
  );
  response.json(query);
});

// gets unsplash image data for the env workshop

app.get("/images", async (req, res) => {
  const API = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=puppy`;
  const response = await fetch(API);
  const imageData = await response.json();

  res.json(imageData.results);
});
