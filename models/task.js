let mongoose = require("mongoose")

let TaskSchema = new mongoose.Schema({
  name:{
    type: String,
    required:[true,"must privide name"],
    trim:true,
    maxlength:[20,"name can not be more than 20 characters"]
  },
  completed:{
    type:Boolean,
    default:false
  },
  createdBy:{
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: "Please privide user"
  }
},{timestamps: true})

module.exports = mongoose.model("Task", TaskSchema)