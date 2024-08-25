import dotenv from "dotenv"
import connectDB from "./db.js"
import { app } from "./app.js"

dotenv.config({
    path: './.env'
})