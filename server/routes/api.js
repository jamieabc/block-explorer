const express = require("express");
const router = express.Router();
const { Client, Pool } = require("pg");

// connect to psql
const connect = query => {
  const client = new Client({
    user: "postgres",
    password: "fggrftdjtgdpjwpsgkwvx",
    host: "taa.devel.bitmark.com",
    database: "testdb"
  });

  client.connect(err => {
    if (err) {
      console.log("connection error", err.stack);
    } else {
      query(client);
    }
  });
};

// Response handling
let response = {
  status: 200,
  data: [],
  message: null
};

// Get users
router.get("/", (req, res) => {
  const query = client =>
    client
      .query("SELECT * FROM blockchain.transaction ORDER BY tx_modified_at DESC LIMIT 1;")
      .then(data => {
        res.send(data.rows);
      })
      .then(() => client.end());
  connect(query);
});

module.exports = router;
