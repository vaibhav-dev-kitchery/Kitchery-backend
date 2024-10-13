import express from "express"
import cors from "cors"



//declaring app
const app = express()
app.use(express.json())

//routes imports
import userRouter from "./routes/userCredentials.route.js"


//routes declaration
app.use("/api/v1/users", userRouter)


//export app
export { app }