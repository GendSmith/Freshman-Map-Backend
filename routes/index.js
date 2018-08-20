const router = require("express").Router;
const login = require("../controllers/login");
const check = require("../controllers/checkCookie");
const Router = new router();

Router.post("/login", login);
Router.get("/check", check);

module.exports = Router;
