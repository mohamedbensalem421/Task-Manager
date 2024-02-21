let express = require("express")
let router = express.Router()
let {getAllTasks,getTask,createTask,updateTask,deleteTask} = require("../controllers/task")

router.route("/").get(getAllTasks).post(createTask)
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask)
module.exports = router