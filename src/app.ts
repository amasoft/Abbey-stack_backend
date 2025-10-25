// import express from "express"
import express, { Application } from "express";

import apiRouter from "./modules"

// const  app =express()

import cors from "cors";

const app: Application = express();

// ✅ Basic CORS setup (allow all origins)
app.use(cors());

app.use(express.json())
app.use("/api/v1",apiRouter)
app.use("/test",()=>{console.log("WELCOME TO API ROUTES")})

export default app