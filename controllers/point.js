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
      imgUrl: [],
      isFinish: false
    },
    architecture: {
      num: POINT_NUM[college],
      finish: 0,
      imgUrl: [],
      isFinish: false
    },
    activity: {
      num: POINT_NUM[college],
      finish: 0,
      imgUrl: [],
      isFinish: false
    },
    life: {
      num: POINT_NUM[college],
      finish: 0,
      imgUrl: [],
      isFinish: false
    }
  };

  mysql
    .queue([
      {
        order: GET_POINT_INFO_SQL,
        argument: [campus, college],
        otuput: "pointInfo"
      },
      {
        order: GET_RECORD_IFNO_SQL,
        argument: [id],
        otuput: "recordInfo"
      }
    ])
    .then(function({totalResults}) {
      // console.log(totalResults[0]);
      // console.log(totalResults[1]);

      //统计进度
      for (let i = 0; i < totalResults[1].length; i++) {
        console.log(totalResults[1][i]);
        console.log(totalResults[1][i].type);
        progress[totalResults[1][i].type.toString()].finish++;
        progress[totalResults[1][i].type.toString()].imgUrl.push(
          totalResults[1][i].img_url
        );
      }

      //console.log(progress);

      const params = {
        pointInfo: totalResults[0],
        progress,
        GET_POINT_SUCCESS
      };
      //console.log(params);

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
