const mysql = require("../utils/mysql");
const SELECT_MAXRANK_SQL =
  "select max(rank) from user_info where college=? limit 1";
const UPDATE_RANK_SQL =
  "update user_info set rank = (?+1) where id=? and rank=0";

function rank(req, res) {
  //console.log("rank.js");
  const {id, college} = req.body;
  mysql
    .queue([
      {
        order: SELECT_MAXRANK_SQL,
        argument: [college],
        output: "maxRank"
      },
      function({maxRank}) {
        let order = [];
        if (maxRank.length == 1) {
          let max = maxRank[0]["max(rank)"];
          order.push({
            order: UPDATE_RANK_SQL,
            argument: [max, id],
            output: "rankResult"
          });
          return {order};
        }
        return null;
      }
    ])
    .then(function({totalResults}) {
      console.log(totalResults[1]["changedRows"]);
      let rank = 0;
      if (totalResults[1]["changedRows"] == 1) {
        rank = totalResults[0][0]["max(rank)"] + 1;
      }
      if (totalResults[1]["changedRows"] == 0) {
        rank = totalResults[0][0]["max(rank)"];
      }
      const params = {
        CODE: 200,
        rank: rank,
        id: id
      };
      //  console.log(params);
      return res.json(params);
    })
    .catch(function(err) {
      console.log("error:");
      console.log(err);
      return res.json({CODE: 400, MSG: "排名失败"});
    });
}

module.exports = {
  rank
};
