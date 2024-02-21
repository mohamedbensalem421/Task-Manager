require("dotenv").config()
let express = require("express");
let app = express();
let tasksRouter  = require("./routes/tasks")
let authRouter = require("./routes/auth")
let connectDB = require("./db/connect")
let notFound = require("./middleware/not-found")
let errorHandler = require("./middleware/error-handler")
let authorization = require("./middleware/authorization")
let path = require("path")


app.use(express.static("./public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/login",(req,res) =>{
  res.sendFile(path.resolve(__dirname, "./public/index.html"))
}) 

app.get("/register",(req,res) =>{
  res.sendFile(path.resolve(__dirname, "./public/register.html"))
})

app.use("/api/v1/auth", authRouter)
app.use("/api/v1/tasks",authorization ,tasksRouter)
app.use(notFound)
app.use(errorHandler)

let port = process.env.PORT || 3000
let start = async () =>{
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, console.log("server is up"));
  } catch (error) {
    console.log(error);
  }
} 
start()