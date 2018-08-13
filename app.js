const express = require("express");
const bodyParser = require("body-parser");
const router = require("./routes/index");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const config = require("./constants/config");
let app = express();
app.use(cors(config.CORES_OPTIONS))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/",router);

try{
    app.listen(config.port);
    console.log("service start！");
} catch(err) {
    console.log(err);
}



