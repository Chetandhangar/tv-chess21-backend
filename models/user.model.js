var mongoose = require('mongoose')
const {Schema} = mongoose;
const Video = require('./video.model.js')

const UserSchema = new Schema({
  username : {
    type : String,
    required : "please provide the username",
    unique : [true , "username is already used"]
  },
  password : {
    type : String,
    required : "Please provide the password"
  },
  email : {
    type : String,
    required : "please provide the valid email"
  },
  likedvideos :[{
    type:Schema.Types.ObjectId,
    ref : Video
  }],
  watchhistory : [{
    type:Schema.Types.ObjectId,
    ref : Video
  }],
  watchlater : [{
    type:Schema.Types.ObjectId,
    ref : Video
  }]
},{
  timestamps : true
})

const User = mongoose.model('User', UserSchema)

module.exports = User;