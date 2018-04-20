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

// response
let resposne = {
  status: 200,
  data: [],
  message: null
};

// error response
const sendError = (err, res) => {
  response.status = 501;
  response.message = typeof err == "object" ? err.message : err;
  res.status(501).join(response);
};

// connect to psql
const connect = query => {
  const client = new Client(db);

  client.connect(err => {
    if (err) {
      sendError(err, res);
      console.log("connection error", err.stack);
    } else {
      query(client);
    }
  });
};

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
  const query = client =>
    client
      .query(queryStr)
      .then(data => {
        // data.rows[0].timestamp = timeConverter(data.rows[0].tx_modified_at);
        res.send(data.rows.map(timeConverter));
      })
      .then(() => client.end());
  connect(query);
});

module.exports = router;
