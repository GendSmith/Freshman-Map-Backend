const router = require("express").Router;
const login = require("../controllers/login");
const check = require("../controllers/checkCookie");
const {point} = require("../controllers/point");
const campus = require("../controllers/campusMiddleware");
const {record} = require("../controllers/record");
const {rank} = require("../controllers/rank");
const Router = new router();

Router.post("/login", login);
Router.get("/check", check);
Router.post("/point", campus, point);
Router.post("/record", record);
Router.post("/rank", rank);

module.exports = Router;
