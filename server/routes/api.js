const express = require("express");
const router = express.Router();
const { Client } = require("pg");

const db = {
  user: "postgres",
  password: "fggrftdjtgdpjwpsgkwvx",
  host: "taa.devel.bitmark.com",
  database: "testdb"
};

const queryStr =
  "SELECT * FROM blockchain.transaction INNER JOIN blockchain.asset ON transaction.tx_asset_id = asset.asset_id INNER JOIN blockchain.block ON block.block_number = asset.asset_block_number ORDER BY tx_modified_at LIMIT 1;";

// connect to psql
const connect = query => {
  const client = new Client(db);

  client.connect(err => {
    if (err) {
      console.log("connection error", err.stack);
    } else {
      query(client);
    }
  });
};

router.get("/", (req, res) => {
  const query = client =>
    client
      .query(queryStr)
      .then(data => {
        res.send(data.rows);
      })
      .then(() => client.end());
  connect(query);
});

module.exports = router;
