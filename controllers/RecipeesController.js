'use strict';
const Recipees = require( '../models/Recipees' );
const RecipeesComment = require( '../models/RecipeesComment' );

exports.saveRecipees = ( req, res ) => {
  //console.log("in saveSkill!")
  //console.dir(req)
  if (!res.locals.loggedIn) {
    res.redirect( '/login' );
  }

  let newRecipees = new Recipees(
   {



    userId: req.user._id,
    userName: req.user.googlename,
    post: req.body.post, //title
    createdAt:  new Date(),
    DishName: req.body.DishName,
    Ingredients: req.body.Ingredients,
    Description: req.body.Description,




   }
  )


  //console.log("skill = "+newSkill)

  newRecipees.save()
    .then( () => {
      res.redirect( 'Recipees' );
    } )
    .catch( error => {
      res.send( "RecipeesError is "+error );
    } );
};


// this displays all of the skills
exports.getAllRecipeess = ( req, res, next ) => {
  //gconsle.log('in getAllSkills')
  console.log("hello hello hello hello")
  Recipees.find({}).sort({createdAt: -1})

    .exec()
    .then( ( posts) => {
      res.render( 'Recipees', {
          title:"RecipeesSchema",posts:posts
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

exports.deleteRecipees = (req, res) => {
  console.log("in deleteRecipees")
  let deleteId = req.body.delete
  if (typeof(deleteId)=='string') {
      // you are deleting just one thing ...
      Recipees.deleteOne({_id:deleteId})
           .exec()
           .then(()=>{res.redirect('/Recipees')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(deleteId)=='object'){
      Recipees.deleteMany({_id:{$in:deleteId}})
           .exec()
           .then(()=>{res.redirect('/Recipees')})
           .catch((error)=>{res.send(error)})
  } else if (typeof(deleteId)=='undefined'){
      //console.log("This is if they didn't select a skill")
      res.redirect('/Recipees')
  } else {
    //console.log("This shouldn't happen!")
    res.send(`unknown deleteId: ${deleteId} Contact the Developer!!!`)
  }

};


// this displays all of the skills
exports.showOneRecipees = ( req, res ) => {
  //gconsle.log('in getAllSkills')
  const id = req.params.id
  console.log('the id is '+id)
  Recipees.findOne({_id:id})
    .exec()
    .then( ( Recipees) => {
      res.render( 'Recipees', {
        post:Recipees, title:"Recipees"
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


exports.saveRecipeesComment = (req,res) => {
  if (!res.locals.loggedIn) {
    return res.send("You must be logged in to post a ride.")
  }

  let newRecipeesComment = new RecipeesComment(
   {
    userId: req.user._id,
    postId: req.body.postId,
    userName:req.user.googlename,
    comment: req.body.comment,
    createdAt: new Date(),
    DishName: req.body.DishName,
    Ingredients: req.body.Ingredients,
    Description: req.body.Description,

   }
  )

  //console.log("skill = "+newSkill)

  newRecipeesComment.save()
    .then( () => {
      res.redirect( 'showPost/'+req.body.postId );
    } )
    .catch( error => {
      res.send( error );
    } );
}




// this displays all of the skills
exports.attachAllRecipeesComment = ( req, res, next ) => {
  //gconsle.log('in getAllSkills')
  console.log("in aAFC with id= "+req.params.id)
  var ObjectId = require('mongoose').Types.ObjectId;
  RecipeesComment.find({postId:ObjectId(req.params.id)}).sort({createdAt:-1})
    .exec()
    .then( ( comments ) => {
      console.log("comments.length=")
      console.dir(comments.length)
      res.locals.comments = comments
      next()
    } )
    .catch( ( error ) => {
      console.log( error.message );
      return [];
    } )
    .then( () => {
      //console.log( 'skill promise complete' );
    } );
};
