/**
 * Created by Vijaya Yeruva on 5/27/2017.
 */

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    var dbase = db.db("mydb");
    dbase.dropDatabase();
    console.log("Database deleted");
});
