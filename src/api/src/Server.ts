import cookieParser from "cookie-parser"
import morgan from "morgan"
import path from "path"
import helmet from "helmet"

import express, { Request, Response, NextFunction } from "express"
import { BAD_REQUEST } from "http-status-codes"
import "express-async-errors"

import BaseRouter from "./routes/routes"
import logger from "@shared/Logger"
const cors = require("cors")

// Init express
const app = express()

/************************************************************************************
 *                              Set basic express settings
 ***********************************************************************************/

app.use(cors())
app.use(express.json({ limit: "50mb" }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Show routes called in console during development
if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

// Security
if (process.env.NODE_ENV === "production") {
    app.use(helmet())
}

// Add APIs
app.use("/api", BaseRouter)

// Print API errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    logger.error(err.message, err)
    return res.status(BAD_REQUEST).json({
        error: err.message,
    })
})

/************************************************************************************
 *                              Serve front-end content
 ***********************************************************************************/

const staticDir = path.join(__dirname, "public")
app.use(express.static(staticDir))

// Export express instance
export default app
