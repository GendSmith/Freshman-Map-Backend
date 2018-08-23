const {CAMPUS} = require("../constants/config");

function campus(req, res, next) {
  const college = req.body.college;
  if (college == "心理学系") req.body.campus = "east";
  if (college == "物理学院") req.body.campus = "south";
  if (college == "药学院") req.body.campus = "east";
  next();

  // if(CAMPUS.south.indexOf(college)) {
  //     req.body.campus = "south";
  //     next();
  // }
  // if(CAMPUS.east.indexOf(college)) {
  //     req.body.campus = "east";
  //     next();
  // }
  // if(CAMPUS.north.indexOf(college)) {
  //     req.body.campus = "north";
  //     next();
  // }
  // if(CAMPUS.shenZhen.indexOf(college)) {
  //     req.body.campus = "shenZhen";
  //     next();
  // }
  // if(CAMPUS.zhuHai.indexOf(college)) {
  //     req.body.campus = "zhuHai";
  //     next();
  // }
}

module.exports = campus;
