const mysql = require("../utils/mysql");
const {CARD_FAIL, CARD_SUCCESS} = require("../constants/status");
const INSERT_RECORD_SQL =
  "insert into record (id,type,img_url,lng,lat) values(?,?,?,?,?)";

function record(req, res) {
  const {id, type, imgUrl,lng,lat} = req.body;
  mysql
    .queue([
      {
        order: INSERT_RECORD_SQL,
        argument: [id, type, imgUrl,lng,lat]
      }
    ])
    .then(function({totalResults}) {
      const params = {
        imgUrl,
        
        CARD_SUCCESS
      }
      return res.json(params);
    })
    .catch(function(err) {
      console.log(err);
      return res.json(CARD_FAIL);
    });
}

module.exports = {record};
