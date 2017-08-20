// npm install mongoose@4.10.8 bluebird --save
const mongoose = require('mongoose');
const Recipe = require('./models/recipe')
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/test');

Recipe.findOne({name: 'Pancakes'})
  .then(function (pancakes) {
    console.log('find returned ' + JSON.stringify(pancakes, null, 2));
    console.log('pancakes total time ' + pancakes.totalTime)
  })

process.on('SIGINT', function() {
  console.log("\nshutting down");
  mongoose.connection.close(function () {
    console.log('Mongoose default connection disconnected on app termination');
    process.exit(0);
  });
});
