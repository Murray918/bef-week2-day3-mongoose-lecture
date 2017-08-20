// npm install mongoose@4.10.8 bluebird --save
const mongoose = require('mongoose');
const Recipe = require('./models/recipe')
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/test');

Recipe.find()
  .then(function(results) {
    console.log('find all ' + JSON.stringify(results, null, 2));
    return Recipe.find(
      {source: 'Grandma'})
      .numberIngredients(0)
  }).then(function(results) {
    console.log('find with query chaining ingredients ' + JSON.stringify(results, null, 2));
  })

process.on('SIGINT', function() {
  console.log("\nshutting down");
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected on app termination');
    process.exit(0);
  });
});
