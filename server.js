const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");
const child_process = require("child_process");
const cors = require("cors");
const app = express();

// API file for interacting with PostgreSQL
const api = require("./server/routes/api");

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, "dist")));

// API location to get postgreSQL data
app.use("/api", cors(), api);

// Send all other requests to the Angular app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

//Set Port to 3000
const port = "3000";
app.set("port", port);

const server = http.createServer(app);

// start protractor in e2e test
if (process.env.e2e) {
  const child = child_process.exec("ng e2e");
  child.stdout.pipe(process.stdout);
  child.stderr.pipe(process.stderr);
  child.on("exit", () => {
    server.close();
  });
}

server.listen(port, () => console.log(`Running API server on localhost:${port}`));
