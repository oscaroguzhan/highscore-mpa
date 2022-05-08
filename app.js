var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// lägga till layout biblioteket
var expressLayouts = require("express-ejs-layouts");
// pool component från pg biblioteket för att kommunicera med database
const { Pool } = require("pg");

var indexRouter = require("./routes/index");
var adminRouter = require("./routes/admin");
var searchRouter = require("./routes/search");
var gamesRouter = require("./routes/games");
var app = express();

/* create an instance object of Pool to communicate
with postgres pgadmin som kör in i container i docker vi har mappat 
in port 5432 för lokala maskin 
in i den här containern. Vi lägger den in i locals objects för att nå den globalt
*/
app.locals.db = new Pool({
  host: "localhost",
  user: "postgres",
  password: "secretpassword",
  database: "highscore",
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(expressLayouts);
app.set("layout", "shared/layout");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/admin", adminRouter);
app.use("/search", searchRouter);
app.use("/games", gamesRouter);
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
