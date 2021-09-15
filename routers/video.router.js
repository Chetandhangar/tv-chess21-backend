const express = require('express')
const router = express.Router();
const Video = require('../models/video.model.js')

router.route('/')
.get(async(req,res) =>{
  try{
    console.log("called get video")
    const videos = await Video.find({})
    res.status(200).json({success : true,
    message : "successfully fetched videos",
    videos })
  }catch(error){
    res.status(501).json({success : false,
    message : "Error while fetching the videos"})
  }
})
  .post(async(req,res) => {
    try{
      const video = req.body;
      const newVideo = new Video(video)
      const addedVideo = await newVideo.save();
      res.json({success : true,
      message : "Video added successfullt",
      video : addedVideo})
    }catch(error){
      res.status(501).json({success : false,
      message : "Unable to add the video"})
    }
  })


module.exports = router