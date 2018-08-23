const mysql = require("../utils/mysql");
const {POINT_NUM} = require("../constants/config");
const GET_POINT_INFO_SQL =
  "SELECT * FROM point WHERE campus=? AND (college = ? OR college = 'public')";
const GET_RECORD_IFNO_SQL = "SELECT * FROM record WHERE id = ?";
const {GET_POINT_FAIL, GET_POINT_SUCCESS} = require("../constants/status");

//获取点的信息API

function point(req, res) {
  const {body: {college, campus, id}} = req;
  //console.log(campus, college);
  let progress = {
    study: {
      num: POINT_NUM[college],
      finish: 0,
      point: [],
      isFinish: false
    },
    famous: {
      num: POINT_NUM[college],
      finish: 0,
      point: [],
      isFinish: false
    },
    activity: {
      num: POINT_NUM[college],
      finish: 0,
      point: [],
      isFinish: false
    },
    life: {
      num: POINT_NUM[college],
      finish: 0,
      point: [],
      isFinish: false
    }
  };

  mysql
    .queue([
      {
        order: GET_POINT_INFO_SQL,
        argument: ["south", "物理学院"],
        otuput: "pointInfo"
      },
      {
        order: GET_RECORD_IFNO_SQL,
        argument: [id],
        otuput: "recordInfo"
      }
    ])
    .then(function({totalResults}) {
      console.log(totalResults[0]);
      console.log(totalResults[1]);

      //统计进度
      for (let i = 0; i < totalResults[1].length; i++) {
        progress[totalResults[1][i].type].finish++;
        progress[totalResults[1][i].type].point.push(totalResults[1][i].point);
      }

      console.log(progress);

      const params = {
        pointInfo: totalResults[0],
        progress,
        GET_POINT_SUCCESS
      };
      console.log(params);

      return res.json(params);
    })
    .catch(function(err) {
      console.log(err);
      return res.json(GET_POINT_FAIL);
    });
}

module.exports = {
  point
};
