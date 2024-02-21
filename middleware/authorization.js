let jwt = require("jsonwebtoken")
let asyncWrapper = require("../middleware/async")
let { UnauthenticatedError } = require("../errors/custom-errors")

let authorization = asyncWrapper(async(req,res,next) =>{
  let authHeader = req.headers.authorization
  if(!authHeader || !authHeader.startsWith("Bearer ")){
    throw new UnauthenticatedError("not valid token")
  }
  let token = authHeader.split(" ")[1]
  try {
    let payload = jwt.verify(token,process.env.JWT_SECRET)
    let {userId,name} = payload
    req.user = {userId,name}
    next()
  } catch (error) {
    throw new UnauthenticatedError("not authorized to access thi route")
  }
})
module.exports = authorization