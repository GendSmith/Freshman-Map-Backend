const mysql = require("ct-mysql");
const {MYSQL_OPTIONS} = require("../constants/config");

module.exports = mysql(MYSQL_OPTIONS);
