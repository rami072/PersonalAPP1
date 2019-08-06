'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

var RecipeASchema = Schema( {
  userId: ObjectId,
  dishName: String,
  ingredients: String,
  description: String,
  createdAt: Date
} );

module.exports = mongoose.model( 'RecipesPost', RecipeASchema );
