'use strict';
const mongoose = require( 'mongoose' );
const Schema = mongoose.Schema;

var RecipesRSchema = Schema( {
  
  dishName: String,
  ingredients: String,
  ingredients: String,
  createdAt: String
} );

module.exports = mongoose.model( 'RecipesR', RecipesRSchema );
