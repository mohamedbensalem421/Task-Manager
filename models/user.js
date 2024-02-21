let mongoose = require("mongoose")
let bcrypt = require("bcryptjs")
let jwt = require("jsonwebtoken")
let UserShema = new mongoose.Schema({
  name:{
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20
  },
  email:{
    type: String,
    required: [true, "Please provide email"],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    unique: true
  },
  password:{
    type: String,
    required: [true, "Please provide password"],
    minlength: 6
  }
})

UserShema.pre("save", async function(){
  let salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password,salt)
})

UserShema.methods.comparePassword = async function(userpassword){
  return await bcrypt.compare(userpassword,this.password)
}

UserShema.methods.createJWT = function(){
  return jwt.sign({userId:this._id,name:this.name},process.env.JWT_SECRET,{expiresIn: process.env.JWT_LIFETIME})
}
module.exports = mongoose.model("User" , UserShema)

