const mongoClient = require("mongodb").MongoClient;

let DBName = "League";
let dbObj;
let DB_URL =
  "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4";

const dbConn = (callback) => {
  mongoClient.connect(DB_URL).then((conn) => {
    dbObj = conn.db(DBName);
    callback();
  });
};

function getDB() {
  if (dbObj) {
    return dbObj;
  }
  throw new Error("Unable to connect to DB!");
}

module.exports = {
  dbConn,
  getDB,
};
