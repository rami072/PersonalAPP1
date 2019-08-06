'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

// sell post
var RecipeesSchema = Schema( {
  userId: ObjectId,
  userName: String,
  createdAt: Date,
  post: String,
  DishName: String,
  Ingredients: String, //title
  Description: String




} );

module.exports = mongoose.model( 'Recipees', RecipeesSchema );
