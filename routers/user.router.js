const express = require('express')
const router = express.Router();
const User = require('../models/user.model.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {verifyLogin, verifyToken} = require('../middlewares/auth.middleware.js');
let Secret = "123-456-789-987-654-321"

router.route('/')
 .get(async(req,res) => {
   try {
     const users = await User.find({})
     res.json({success : true,
     message : "fetch user successfullt",
     users})
   }catch(error){
     res.json({success : false
     ,message : "unable to find the users"})
   }
 })
  router.use('/login',verifyLogin)
  router.route('/login')
    .post(async(req,res) => {
      try{
        const user = req.user
        const token = jwt.sign({userId : user._id}, Secret, {expiresIn : "123h"})
        res.status(200).json({success : true,
        message : "successfully Login ",
        username : user.username,
        userId : user._id,
        token})      
      }catch(error){
        res.status(501).json({success : false,
        message : "Error while login"})
      }
    })


 router.route('/signup')
    .post(async(req,res)=>{
      try{
        const user = req.body;
         const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(user.password,salt)
        user.password = hashedPassword;
        const newUser = new User(user)
        const addedUser = await newUser.save()
        res.status(200).json({success : true ,
        message : "User created successfully",
        user : addedUser})
      }catch(error){
        res.status(501).json({success : false,
        message : "unable to add the user",
        })
      }
    });

 router.use(verifyToken);
router.route('/likedvideos')
  .get(async(req,res) => {
    try{
      const userId = req.user;
      const user = await User.findById(userId).populate('likedvideos');
      res.status(200).json({success : true,
      message : "Liked Videos Fetch successfully",
      likedvideos : user.likedvideos})
    }catch(error){
      res.status(501).json({success : false ,
      message : "Error while fetching the liked videos"})
    }
  })
  .post(async(req,res) =>{
    try{
      const userId = req.user;
      console.log(userId)
      const {videoId} = req.body;
        updatedUser = await User.findByIdAndUpdate({_id:userId},{
                $addToSet:{
                      likedvideos:videoId
                }
            })
        res.status(200).json({success : true,
        message : "successfully added to liked videos",
        updatedLikedvideos : updatedUser.likedvideos 
      })
    }catch(error){
      res.status(501).json({
        success : false,
        message : "Error while adding video to like videos"
      })
    }
  })

  router.route('/removelikevideo')
    .post(async (req,res) =>{
      try{
        const userId = req.user;
        const {videoId} = req.body;
          updatedUser = await User.findByIdAndUpdate({_id:userId},{
                $pull:{
                likedvideos:videoId
                }
            })
          res.status(200).json({success : true,
          message : "Video remove from liked videos successfully",
          updatedLikeVideos : updatedUser.likedvideos})
      }catch(error){
        res.status(501).json({success : false,
        message : "Error while removing video from like list"})
      }
    })  

    router.route('/watchlater')
     .get(async(req,res) => {
       try {
         const userId = req.user;
          const user = await User.findById(userId).populate('watchlater');
      res.status(200).json({success : true,
      message : "Watch Later Videos Fetch successfully",
      watchlater : user.watchlater})
       }catch(error){
         res.status(501).json({success : false,
         message : "Error while fetchig Watch Later vidos"})
       }
     })
     .post(async(req,res) =>{
    try{
      const userId = req.user;
      console.log(userId)
      const {videoId} = req.body;
        updatedUser = await User.findByIdAndUpdate({_id:userId},{
                $addToSet:{
                      watchlater:videoId
                }
            })
        res.status(200).json({success : true,
        message : "successfully added as Watch Later",
        updatedWatchLater : updatedUser.watchlater
      })
    }catch(error){
      res.status(501).json({
        success : false,
        message : "Error while adding video to Watch Later"
      })
    }
  })
     
  router.route('/removewatchlater')
    .post(async (req,res) =>{
      try{
        const userId = req.user;
        const {videoId} = req.body;
          updatedUser = await User.findByIdAndUpdate({_id:userId},{
                $pull:{
                watchlater:videoId
                }
            })
          res.status(200).json({success : true,
          message : "Video remove from watch later videos successfully",
          updatedWatchLater: updatedUser.watchlater})
      }catch(error){
        res.status(501).json({success : false,
        message : "Error while removing video from watch later"})
      }
    })  

     router.route('/watchhistory')
     .get(async(req,res) => {
       try {
         const userId = req.user;
          const user = await User.findById(userId).populate('watchhistory');
      res.status(200).json({success : true,
      message : "WatchHistory Videos Fetch from server successfully",
      watchhistory : user.watchhistory})
       }catch(error){
         res.status(501).json({success : false,
         message : "Error while fetchig Watch History vidos"})
       }
     })
     .post(async(req,res) =>{
    try{
      const userId = req.user;
      console.log(userId)
      const {videoId} = req.body;
        updatedUser = await User.findByIdAndUpdate({_id:userId},{
                $addToSet:{
                      watchhistory:videoId
                }
            })
        res.status(200).json({success : true,
        message : "successfully added as Watch History",
        updatedWatchHistory : updatedUser.watchhistory
      })
    }catch(error){
      res.status(501).json({
        success : false,
        message : "Error while adding video to Watch History"
      })
    }
  })
   router.route('/removewatchhistory')
    .post(async (req,res) =>{
      try{
        const userId = req.user;
        const {videoId} = req.body;
          updatedUser = await User.findByIdAndUpdate({_id:userId},{
                $pull:{
                watchhistory:videoId
                }
            })
          res.status(200).json({success : true,
          message : "Video remove from watch history videos successfully",
          updatedWatchHistory: updatedUser.watchhistory})
      }catch(error){
        res.status(501).json({success : false,
        message : "Error while removing video from Watch History"})
      }
    })  

 module.exports = router;

