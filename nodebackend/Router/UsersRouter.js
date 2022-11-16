const path = require("path");
const express = require("express");
// UsersRouter
const UsersRouter = express.Router();

// pointsRouter
const pointsRouter = express.Router();

// CONTROLLER
const {
  login,
  register,
  getCurrentUser,
  logoutUser,
  getAllTeams,
  updateTeamPoints,
} = require("../Controller/UsersController");

const { isAuthenticated } = require("../Controller/UtilsController");

pointsRouter.get("/get-all-teams", getAllTeams);

pointsRouter.post("/add-team", updateTeamPoints);

UsersRouter.get("/me", isAuthenticated, getCurrentUser);

UsersRouter.post("/login", login);

UsersRouter.post("/signup", register);

UsersRouter.post("/logout", isAuthenticated, logoutUser);

module.exports = {
  UsersRouter,
  pointsRouter,
};
