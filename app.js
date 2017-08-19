// npm install mongoose@4.10.8 bluebird --save
const mongoose = require('mongoose');
const Recipe = require('./models/recipe')
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/test');

Recipe.findOne({name: "Pancakes"})
  .then(function (results) {
    console.log('findOne returned ' + results);
    return Recipe.updateOne({source: "Grandma"},
    {$push: {steps: "Call Grandma and tell her how it was."}})
  }).then(function (results) {
    console.log('updateOne returned ' + JSON.stringify(results));
    return Recipe.updateMany({source: "Grandma"},
    {$push: {steps: "Call Grandma and tell her how much the dog enjoyed it."}})
  }).then(function (results) {
    console.log('updateMany returned ' + JSON.stringify(results));
    return Recipe.find({source: "Grandma"}).select("name");
  }).then(function (results) {
    console.log('find returned ' + JSON.stringify(results));
  }).catch(function (error) {
    console.log('error ' + JSON.stringify(error));
  })

process.on('SIGINT', function() {
  console.log("\nshutting down");
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected on app termination');
    process.exit(0);
  });
});
