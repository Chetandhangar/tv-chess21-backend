const mongoose = require('mongoose');
const {Schema} = mongoose;

const VideoSchema = new Schema({
  title : {
    type : String,
    required : true
  },
  videolink : {
    type : String,
    required : true,
    unique : true
  },
  description : {
    type : String,
    required : true 
  },
  thumbnail :{
    type : String,
    required : true,
  },
  channelName : {
    type : String,
    required : true,
  },
  channelAvatar : {
    type : String,
    required: true
  },
  publishedDate : {
    type : String,
    required : true
  },
  categories : {
    type : Array
  },
}, {
  timestamps : true
});


const Video = mongoose.model('Video', VideoSchema);

module.exports = Video
