const router = require("express").Router;
const login = require("../controllers/login");
const check = require("../controllers/checkCookie");
const {point} = require("../controllers/point");
const campus = require("../controllers/campusMiddleware");
const Router = new router();

Router.post("/login", login);
Router.get("/check", check);
Router.post("/point",campus,point);

module.exports = Router;
