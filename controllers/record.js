const mysql = require("../utils/mysql");
const {CARD_FAIL, CARD_SUCCESS} = require("../constants/status");
const INSERT_RECORD_SQL =
  "INSERT INTO record (id,type,point_name,lng,lat,finish_timestamp) VALUES(?,?,?,?,?,now())";

function record(req, res) {
  const {id, type, pointName,lng,lat} = req.body;
  mysql
    .queue([
      {
        order: INSERT_RECORD_SQL,
        arguments: [id, type, pointName,lng,lat]
      }
    ])
    .then(function({totalResults}) {
      return res.json(CARD_SUCCESS);
    })
    .catch(function(err) {
      console.log(err);
      return res.json(CARD_FAIL);
    });
}

module.exports = {record};
