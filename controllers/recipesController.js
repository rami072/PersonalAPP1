'use strict';
const RecipeA = require( '../models/RecipeA' );

exports.saveRecipesPost = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  if (!res.locals.loggedIn) {
    return res.send("You must be logged in to post to a question.")
  }

  let newRecipeA = new RecipeA(
    {
      userId: req.user._id,
      //questionId: req._id,
      dishName:req.user.dishName,
      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      createdAt: new Date()
    }
  )

  newRecipeA.save()
  .then( () => {
    res.redirect( 'showRecipes' );
  } )
  .catch( error => {
    res.send( error );
  } );
};

// this displays all of the skills
exports.getAllRecipeA = ( req, res, next ) => {
  //gconsle.log('in getAllSkills')
  RecipeA.find()
  .exec()
  .then( ( recipes ) => {
    res.render('showRecipes',{recipes:recipes,title:"showRecipes"})
  } )
  .catch( ( error ) => {
    console.log( error.message );
    return [];
  } )
  .then( () => {
    //console.log( 'skill promise complete' );
  } );
};



//edit question function
exports.editRecipeA = ( req, res ) => {
  const id = req.params.id
  RecipeA.findOne({_id:id})
  .exec()
  .then( ( question ) => {
    recipes.recipes = req.body.recipes
    recipes.ingredients = req.body.ingredients
    recipes.instructions = req.body.instructions
    question.save()
  })
  .then(() => {
    res.redirect('/showRecipes/'+id)
  })
  .catch(function (error) {
    console.log("edit question failed!")
    console.log(error);
  })
};
