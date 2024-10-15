const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
  MongoClient.connect(
    process.env.MONGO_URL
  )
    .then((client) => {
      console.log("CONNECTED TO MONGO DB");
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log("ERROR CONNECTING TO DB : " + err)
    });
}

//this method returns access to the db if connection is successful
const getDb = () => {
  if(_db){
    return _db;
  }
  throw 'No database found!';
}
module.exports = {mongoConnect, getDb};