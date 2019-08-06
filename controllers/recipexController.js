'use strict';
const RecipesR= require( '../models/RecipesR' );

exports.saveRecipesR = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  let newRecipesR = new RecipesR(
   {
  //  userId: ObjectId,
    dishName: req.body.dishName,
    ingredients: req.body.ingredients,
    instructions: req.body.instructions,
    createdAt: Date()

   }
 )


newRecipesR.save()
  .then( () => {
    res.redirect( '/processRecipexForm' );
  } )
  .catch( error => {
    res.send( error );
  } );
};


// this displays all of the skills
exports.getAllRecipesR = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  RecipesR.find()
    .exec()
    .then( ( recipex ) => { console.dir(recipex)
      res.render( 'recipex', {
        title:"Recipex",recipex:recipex
      } );
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      //console.log( 'skill promise complete' );
    } );
};
