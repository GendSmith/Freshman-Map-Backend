//登录验证API
const mysql = require("../utils/mysql");
const LOGIN_SQL = "SELECT * FROM user_info WHERE id = ?";
const {NO_USER, WRONG_USER, RIGHT_USER} = require("../constants/status");
function login(req, res) {
  console.log("call login ");
  console.log(req.body);
  const body = req.body;
  const options = [req.body.schoolID];
  mysql
    .queue([
      {
        order: LOGIN_SQL,
        argument: options,
        output: "userInfo"
      },
      function(output) {
        const info = output.userInfo[0];
        console.log(info);
        if (
          info == undefined ||
          info.name != body.name ||
          info.college != body.college
        ) {
          console.log("信息不匹配");
          return res.json(WRONG_USER);
        } else {
            console.log("查询成功");
          return res.json(RIGHT_USER);
        }
      }
    ])
    .catch(function(err) {
      return res.json(NO_USER);
      console.log(err);
    });
}

module.exports = login;
