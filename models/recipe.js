// models/recipe.js
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const Promise = require('bluebird');

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    prepTime: Number,
    cookTime: Number,
    ingredients: [{
        amount: { type: Number, required: true, default: 1 },
        measure: { type: String, lowercase: true, trim: true },
        ingredient: { type: String, required: true }
    }],
    steps: [String],
    source: {type: String}
// }
// {
//   // show virtuals when the toJSON is called
//     toJSON: { virtuals: true }
})

recipeSchema.virtual('totalTime').get(function () {
  return (this.prepTime || 0) + (this.cookTime || 0);
});

recipeSchema.methods.hi = function (callback) {
  return new Promise(function(resolve, reject) {
      resolve("hi")
  })
}

recipeSchema.methods.findRecipesFromSameSource = function (callback) {
  return this.model('Recipe').find({
    source: this.source,
    _id: {$ne: this._id}
  }, callback);
}

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe
