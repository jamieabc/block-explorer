const express = require("express");
const router = express.Router();
const { Client } = require("pg");

// db configuration
const db = {
  user: "postgres",
  password: "fggrftdjtgdpjwpsgkwvx",
  host: "taa.devel.bitmark.com",
  database: "testdb"
};

// specific query to retrieve latest transaction
const queryLatestTransactionStr =
  "SELECT * FROM blockchain.transaction INNER JOIN blockchain.asset ON transaction.tx_asset_id = asset.asset_id INNER JOIN blockchain.block ON block.block_number = asset.asset_block_number ORDER BY tx_modified_at LIMIT 1;";

const queryBlockNumberStr = blockNumber =>
  `SELECT * FROM blockchain.transaction INNER JOIN blockchain.asset ON transaction.tx_asset_id = asset.asset_id INNER JOIN blockchain.block ON block.block_number = asset.asset_block_number WHERE transaction.tx_block_number = '${blockNumber}' ORDER BY tx_modified_at LIMIT 1;`;

const queryAssetIdStr = assetId =>
  `SELECT * FROM blockchain.transaction INNER JOIN blockchain.asset ON transaction.tx_asset_id = asset.asset_id INNER JOIN blockchain.block ON block.block_number = asset.asset_block_number WHERE transaction.tx_asset_id = '${assetId}' ORDER BY tx_modified_at LIMIT 1;`;

// error response
const sendError = (err, res) => {
  let response = {
    status: 501,
    data: [],
    message: typeof err == "object" ? err.message : err
  };
  res.status(501).join(response);
};

// connect to postgres server
const connectDB = (query, queryStr, res) => {
  const client = new Client(db);

  client.connect(err => {
    if (err) {
      sendError(err, res);
      console.log("connection error", err.stack);
    } else {
      query(client, queryStr, res);
    }
  });
};

// generate query
const queryFactory = (client, queryStr, res) =>
  client
    .query(queryStr)
    .then(data => {
      res.send(data.rows.map(timeConverter));
    })
    .then(() => client.end());

// convert date to format of  May 2, 2015 10:49:19 AM
const timeConverter = obj => {
  const [week, month, day, year, time] = new Date(obj.tx_modified_at).toString().split(" ");
  let [hour, minute, second] = time.split(":");
  hour = parseInt(hour, 10);

  const am = hour < 12;

  // for hour, needs to transformm to 01, 02, etc.
  if (am) {
    hour = ("0" + hour).slice(-2);
  } else {
    hour = ("0" + (hour - 12 === 0 ? 12 : hour - 12)).slice(-2);
  }

  obj.timestamp = `${month} ${day}, ${year} ${hour}:${minute}:${second} ${am ? "AM" : "PM"}`;
  return obj;
};

router.get("/latest_transaction", (req, res) => {
  connectDB(queryFactory, queryLatestTransactionStr, res);
});

router.get("/block/:blockNumber", (req, res) => {
  const { blockNumber = 2 } = req.params;
  connectDB(queryFactory, queryBlockNumberStr(blockNumber), res);
});

router.get("/asset/:assetId", (req, res) => {
  const { assetId = 2 } = req.params;
  connectDB(queryFactory, queryAssetIdStr(assetId), res);
});

module.exports = router;
