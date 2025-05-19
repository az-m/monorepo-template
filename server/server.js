import express from "express";
const app = express();

app.use(express.json());

app.listen(8080, function () {
  console.log("Server is alive and listening on 8080");
});

app.get("/", function (request, response) {
  response.json({ message: "This is the root of the API." });
});
