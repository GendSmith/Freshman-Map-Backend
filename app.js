const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const http = require("http");
const config = require("./constants/config");
let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/",router);

http.createServer(app).listen(config.port);


