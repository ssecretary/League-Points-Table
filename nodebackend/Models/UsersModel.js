const { getDB } = require("../DB/DBUtils");

const UserModelName = "users";

const PointsTable = "points_table";

class UserModel {
  static User() {
    return getDB().collection(UserModelName);
  }

  static getAllUsers() {
    return this.User().find().toArray();
  }

  static addNewUser(user) {
    return this.User().insertOne(user);
  }

  static searchUser(query) {
    return this.User().findOne(query);
  }
}

class PointsModel {
  static Points() {
    return getDB().collection(PointsTable);
  }

  static getAllTeamsPoints() {
    return this.Points().find().sort({ points: -1 }).toArray();
  }

  static searchTeam(query) {
    return this.Points().findOne(query);
  }

  static updatePoints(oldValue, newValue) {
    var myquery = { team: oldValue };
    var newvalues = { points: newValue.points };
    return this.Points().updateOne(myquery, { $set: newvalues });
  }

  static addTeam(value) {
    return this.Points().insertOne(value);
  }
}

module.exports = {
  UserModel,
  UserModelName,
  PointsTable,
  PointsModel,
};
