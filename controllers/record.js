const mysql = require("../utils/mysql");
const {CARD_FAIL, CARD_SUCCESS} = require("../constants/status");
const INSERT_RECORD_SQL =
  "INSERT INTO record (id,type,point,finish_timestamp) VALUES(?,?,?,now())";

function record(req, res) {
  const {id, type, point} = req.body;
  mysql
    .queue([
      {
        order: INSERT_RECORD_SQL,
        arguments: [id, type, point]
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
