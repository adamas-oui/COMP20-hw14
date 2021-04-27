//get each line from .cvs file
var readline = require('readline');
var fs = require('fs');

var companies = new Array;
  var tickers = new Array;
var myFile = readline.createInterface({
  input: fs.createReadStream('companies.csv')
});
myFile.on('line', function(line){
  // console.log(line);
  var parseLine = line.split(',');
  companies.push(parseLine[0]);
  console.log(companies);
  console.log("->");
  tickers.push(parseLine[1]);
  console.log(tickers);
});

//connect to mongo 
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://yilin:programming@cluster0.ofgti.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

MongoClient.connect(url,function(err, db){
  //callback function
  if(err){return console.log(err); return;}
  var dbo = db.db("db_company1");
  var collection = dbo.collection('companydb');
  for(i = 1; i < companies.length; i++){
    var newData = {"Company": companies[i], "Ticker": tickers[i]};
    collection.insertOne(newData, function(err,res){
      if(err) throw err;
      console.log("new document inserted");
    });
  }
  setTimeout(function(){db.close();console.log("Success!");},1000);
});