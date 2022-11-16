const path = require("path");
const express = require("express");
const { json, static } = require("express");
const session = require("express-session");
const cors = require("cors");
// CONNECTING TO DB
const { dbConn } = require("./DB/DBUtils");

// ROUTER IMPORTS
const {
  UsersRouter,
  JokeRouter,
  pointsRouter,
} = require("./Router/UsersRouter");

const app = express();

// CORS SETUP
const whitelist = ["http://localhost:3001", "http://localhost:3000"];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

// SITE CONFIGURATIONS
app.set("view engine", "ejs");
app.use(static(path.join(__dirname, "public")));

// MIDDLEWARE TO PARSE JSON BODY REQ
app.use(json());

// MIDDLEWARE FOR HANDLING SESSION BASED REQUESTS
app.use(
  session({
    secret: "MYSECRETKEY",
    saveUninitialized: true,
    resave: true,
    cookie: { secure: false },
  })
);

// ROUTES
app.use("/api/users", UsersRouter);
app.use("/api/league", pointsRouter);

// 404 Route
app.use("/", (req, res, next) => {
  res.status(400).send("No such page found");
});

dbConn(() => {
  app.listen(5000, () => {
    console.log("Server started..");
  });
});
