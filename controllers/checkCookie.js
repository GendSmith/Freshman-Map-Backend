const mysql = require("../utils/mysql");
const CHECK_SQL = "SELECT * FROM user_info WHERE id = ?";

const COOKIE_ERROR = {
  CODE: 201,
  MSG: "cookie验证失败"
};

const COOKIE_SUCCESS = {
  CODE: 200,
  MSG: "cookie验证成功"
};

function chechCookie(req, res) {
  console.log("chechCookies.js req.cookies:");
  console.log(req.session);
  const {userId} = req.session;
  if (!userId) {
    return res.json(COOKIE_ERROR);
  }
  mysql
    .query(CHECK_SQL, [userId])
    .then(function({results}) {
      console.log(results);
      return res.json(results);
    })
    .catch(function(err) {
      console.log(err);
      return res.json(COOKIE_ERROR);
    });
}

module.exports = chechCookie;
