import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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

import pg from "pg";
const db = new pg.Pool({
  connectionString: process.env.DB_URL,
});

app.get("/images", async (req, res) => {
  const API = `https://api.unsplash.com/search/photos?client_id=${process.env.UNSPLASH_ACCESS_KEY}&query=puppy`;
  const response = await fetch(API);
  const imageData = await response.json();

  res.json(imageData.results);
});
