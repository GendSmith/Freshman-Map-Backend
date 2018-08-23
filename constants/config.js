const DEBUG = true;
const DOMAIN = DEBUG ? "http://localhost:8080" : "http://newsysu.cn";

const port = 6699;

const MYSQL_OPTIONS = {
  host: "139.199.79.39",
  user: "root",
  password: "newsysu",
  database: "newsysu",
  port: 3306
};

const CORS_OPTIONS = {
  credentials: true,
  origin: DOMAIN,
  methods: "GET, POST"
};

const CAMPUS = {
  east: ["心理学系", "药学院"],
  south: ["物理学院"],
  north: [],
  shenZhen: [],
  zhuHai: []
};

const POINT_NUM = {
  物理学院: {
    famous: 6,
    activity: 6,
    life: 6,
    study: 6
  },
  心理学系: {
    famous: 6,
    activity: 6,
    life: 6,
    study: 6
  },
  药学院: {
    famous: 6,
    activity: 6,
    life: 6,
    study: 6
  }
};

module.exports = {
  port: port,
  CORES_OPTIONS: CORS_OPTIONS,
  MYSQL_OPTIONS: MYSQL_OPTIONS,
  CAMPUS,
  POINT_NUM
};
