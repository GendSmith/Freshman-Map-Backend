const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const config = require("./constants/config");
let app = express();
const cors = require("cors");
app.use(cors(config.CORES_OPTIONS));
app.use(
  require("express-session")({
    resave: true,
    saveUninitialized: true,
    secret: "ssshhhhh",
    cookie: {
      maxAge: 60 * 60 * 24 * 7 * 30,
      secure: false
    }
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/", router);

try {
  app.listen(config.port);
  console.log("service start！");
} catch (err) {
  console.log(err);
}
