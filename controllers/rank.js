const mysql = require("../utils/mysql");

const SELECT_MAXRANK_SQL = "select max(rank) from user_info limit 1";
const UPDATE_RANK_SQL = "update user_info set rank = ? where id=?";

function rank(req, res) {
  const {id} = req.body;
  mysql
    .queue([
      {
        order: SELECT_MAXRANK_SQL,
        argument: [],
        output: "maxRank"
      },
      function({maxRank}) {
        //console.log(maxRank[0]["max(rank)"]);
        let order = [];
        if (maxRank.length == 1) {
          //console.log(maxRank[0]);
          let max = maxRank[0]["max(rank)"] + 1;
          //console.log(max);
          order.push({
            order: UPDATE_RANK_SQL,
            argument: [max, id]
          });
          return {order};
        }
        return null;
      }
    ])
    .then(function({totalResults}) {
      const params = {
        CODE: 200,
        rank: totalResults[0][0]["max(rank)"] + 1,
        id: id
      };
      console.log(params);
      return res.json(params);
    })
    .catch(function(err) {
      console.log(err);
      return res.json({CODE: 400, MSG: "排名失败"});
    });
}

module.exports = {
  rank
};
