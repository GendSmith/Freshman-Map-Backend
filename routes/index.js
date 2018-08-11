const router = require("express").Router;
const login = require("../controllers/login");
const Router = new router();

Router.post("/login",login);

module.exports = Router;