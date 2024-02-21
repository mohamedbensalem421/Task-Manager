
let Task = require("../models/task")
let asyncWrapperMiddleware = require("../middleware/async")
let {NotFoundError} = require("../errors/custom-errors")

let getAllTasks = asyncWrapperMiddleware(async (req,res) =>{
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate'); // HTTP 1.1.
    res.setHeader('Pragma', 'no-cache'); // HTTP 1.0.
    res.setHeader('Expires', '0');
    let task = await Task.find({createdBy:req.user.userId})
    res.status(200).json({task,user:req.user})
})
let getTask = asyncWrapperMiddleware(async (req,res,next) =>{
    let taskId = req.params.id
    let task = await Task.findOne({_id: taskId})
    if(!task){
      throw new NotFoundError(`No task with id: ${taskId}`)
    }
    res.status(200).json(task)
})
let createTask = asyncWrapperMiddleware(async (req,res) =>{
    req.body.createdBy = req.user.userId
    let task = await Task.create(req.body)
    res.status(201).json(task)
})
let updateTask = asyncWrapperMiddleware(async (req,res) =>{
    let taskId = req.params.id
    let task = await Task.findOneAndUpdate({_id: taskId},req.body,{
      new: true,
      runValidators:true
    })
    if(!task){
      throw new NotFoundError(`No task with id: ${taskId}`)
    }
    res.status(200).json({task})
})
let deleteTask = asyncWrapperMiddleware(async (req,res) =>{
    let taskId = req.params.id
    let task = await Task.findByIdAndDelete({_id: taskId})
    if(!task){
      throw new NotFoundError(`No task with id: ${taskId}`)
    }
    res.status(200).send()
})

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
}