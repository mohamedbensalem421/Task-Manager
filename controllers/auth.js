let User = require("../models/user")
let asyncWrapper = require("../middleware/async")
let {BadRequestError,NotFoundError,UnauthenticatedError} = require("../errors/custom-errors")

let register = asyncWrapper(async (req,res)=>{
  let {name,email,password} = req.body
  if(!name || !email || !password){
    throw new BadRequestError("please provide name, email and password")
  }
  let user = await User.create(req.body)
  let token = user.createJWT()
  res.status(201).json({user,token})
})
let login = asyncWrapper(async (req,res)=>{
  let {email,password} = req.body
  if(!email || !password){
    throw new BadRequestError("Please provide email and password")
  }
  let user = await User.findOne({email})
  if(!user){
    throw new NotFoundError("Invalid email")
  }
  let correctPassword = await user.comparePassword(password)
  if(!correctPassword){
    throw new UnauthenticatedError("Invalid password")
  }
  let token = user.createJWT()
  res.json({user,token}) 
})

module.exports = {
  register,
  login 
} 