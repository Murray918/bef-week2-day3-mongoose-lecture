// npm install mongoose@4.10.8 bluebird --save
const mongoose = require('mongoose');
const Recipe = require('./models/recipe')
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/test');

Recipe.find({name: /Pancakes.*/i}).select('name')
  .then(function (results) {
    console.log('find returned ' + JSON.stringify(results, null, 2));
    return Recipe.deleteOne({name: results[results.length - 1].name})
  }).then(function (results) {
    console.log('deleteOne results ' + JSON.stringify(results));
    return Recipe.find({name: /Pancakes.*/i}).select('name')
  }).then(function (results) {
    console.log('find returned ' + JSON.stringify(results, null, 2));
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
