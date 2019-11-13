var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://127.0.0.1:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("emp2");
  var myquery = { name: "Kamlesh" };
  var newvalues = { $set: {name: "vijay", city: "Mumbai" } };
  dbo.collection("emps").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
    db.close();
  });
});