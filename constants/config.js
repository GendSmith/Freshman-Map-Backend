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

module.exports = {
  port: port,
  CORES_OPTIONS: CORS_OPTIONS,
  MYSQL_OPTIONS: MYSQL_OPTIONS
};
